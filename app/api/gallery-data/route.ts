import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { PathScrubber, RequestThrottler } from '@/security/guards';

// Credentials stay server-side only (no NEXT_PUBLIC prefix)
const webflowApiBase = process.env.WEBFLOW_URL;
const authKey = process.env.WEBFLOW_WORKSPACE_TOKEN;
const collectionIdentifier = process.env.WEBFLOW_COLLECTION_ID;

const pathCleaner = new PathScrubber();
const trafficControl = new RequestThrottler();

// Custom response structure validator
type GalleryDataPayload = {
  items?: Array<{
    id?: string;
    fieldData?: Record<string, unknown>;
  }>;
};

function examineResponseStructure(unknownData: unknown): GalleryDataPayload | null {
  if (typeof unknownData !== 'object' || unknownData === null) {
    return null;
  }
  
  const dataAsRecord = unknownData as Record<string, unknown>;
  
  if (!('items' in dataAsRecord)) {
    return null;
  }
  
  if (!Array.isArray(dataAsRecord.items)) {
    return null;
  }
  
  return dataAsRecord as GalleryDataPayload;
}

export async function GET(req: NextRequest) {
  try {
    // Extract visitor identifier
    const visitorIp = req.headers.get('x-forwarded-for') || 
                      req.headers.get('x-real-ip') || 
                      'unknown-client';
    
    // Check traffic limits
    if (!trafficControl.canProceed(visitorIp)) {
      return NextResponse.json(
        { error: 'Too many requests from this location' },
        { status: 429 }
      );
    }

    // Verify configuration exists
    if (!webflowApiBase || !authKey || !collectionIdentifier) {
      console.error('Server environment not properly configured');
      return NextResponse.json(
        { error: 'Service configuration incomplete' },
        { status: 500 }
      );
    }

    // Build sanitized API path
    const sanitizedId = pathCleaner.cleanupPath(collectionIdentifier);
    const apiRoute = `/collections/${sanitizedId}/items`;
    const completeUrl = `${webflowApiBase}${apiRoute}`;

    // Execute backend request
    const backendResponse = await axios.get(completeUrl, {
      headers: {
        'Authorization': `Bearer ${authKey}`,
        'Accept': 'application/json',
      },
      timeout: 12000,
    });

    // Validate what we received
    const checkedData = examineResponseStructure(backendResponse.data);
    
    if (!checkedData) {
      console.error('Received unexpected data format from upstream');
      return NextResponse.json(
        { error: 'Upstream service returned invalid format' },
        { status: 502 }
      );
    }

    return NextResponse.json(checkedData);
    
  } catch (err) {
    // Log internally but don't expose details
    console.error('Gallery API route encountered error');
    
    if (axios.isAxiosError(err)) {
      const upstreamStatus = err.response?.status || 500;
      return NextResponse.json(
        { error: 'Could not reach external service' },
        { status: upstreamStatus >= 500 ? 502 : upstreamStatus }
      );
    }
    
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
