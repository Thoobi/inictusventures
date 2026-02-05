// Inictus Security Guards - Custom Implementation

export class TextArmorizer {
  private dangerousChars = new Map([
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['"', '&quot;'],
    ["'", '&#x27;'],
    ['&', '&amp;']
  ]);

  fortify(rawText: string | undefined | null): string {
    if (!rawText) return '';
    
    let armored = rawText;
    this.dangerousChars.forEach((entity, char) => {
      const pattern = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      armored = armored.replace(pattern, entity);
    });
    
    return armored;
  }
}

export class UrlGuardian {
  private trustedSchemes = ['https:', 'http:'];
  private imageIndicators = [
    '.jpg', '.jpeg', '.png', '.gif', 
    '.webp', '.svg', '/image', '/img', '/photo'
  ];

  inspectImageLink(linkToCheck: string): boolean {
    if (!linkToCheck || linkToCheck.trim().length === 0) {
      return false;
    }
    
    let urlParts;
    try {
      urlParts = new URL(linkToCheck);
    } catch {
      return false;
    }
    
    const schemeOk = this.trustedSchemes.includes(urlParts.protocol);
    if (!schemeOk) return false;
    
    const pathLower = urlParts.pathname.toLowerCase();
    const hasImageMarker = this.imageIndicators.some(marker => 
      pathLower.includes(marker)
    );
    
    return hasImageMarker;
  }

  enforceSecureProtocol(maybeUrl: string | undefined): string | undefined {
    if (!maybeUrl) return undefined;
    
    let parsed;
    try {
      parsed = new URL(maybeUrl);
    } catch {
      return undefined;
    }
    
    return parsed.protocol === 'https:' ? maybeUrl : undefined;
  }
}

export class PathScrubber {
  private forbiddenSequences = ['..', '://', '\\\\'];
  
  cleanupPath(dirtyPath: string): string {
    let cleaned = dirtyPath;
    
    this.forbiddenSequences.forEach(badSeq => {
      while (cleaned.includes(badSeq)) {
        cleaned = cleaned.replace(badSeq, '');
      }
    });
    
    cleaned = cleaned.replace(/\/+/g, '/');
    
    return cleaned;
  }
}

export class ErrorVault {
  hideInternalDetails(suspectError: unknown): Error {
    const isAxiosType = suspectError && 
      typeof suspectError === 'object' && 
      'isAxiosError' in suspectError;
    
    const safeMessage = isAxiosType 
      ? 'Network operation unsuccessful' 
      : 'Operation could not complete';
    
    return new Error(safeMessage);
  }
}

export class RequestThrottler {
  private visitLog = new Map<string, number[]>();
  private readonly windowMs = 60000;
  private readonly maxHits = 30;

  canProceed(visitorId: string): boolean {
    const rightNow = Date.now();
    const cutoffTime = rightNow - this.windowMs;
    
    const previousVisits = this.visitLog.get(visitorId) || [];
    const recentVisits = previousVisits.filter(timestamp => timestamp > cutoffTime);
    
    if (recentVisits.length >= this.maxHits) {
      return false;
    }
    
    recentVisits.push(rightNow);
    this.visitLog.set(visitorId, recentVisits);
    
    return true;
  }
}
