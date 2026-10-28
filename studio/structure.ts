import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Inistic")
        .child(
          S.list()
            .title("Inistic")
            .items([
              S.documentTypeListItem("galleryAlbum").title("Gallery albums"),
              S.documentTypeListItem("sponsor").title("Sponsors"),
              S.documentTypeListItem("patron").title("Patrons"),
            ]),
        ),
      S.listItem()
        .title("DAM")
        .child(
          S.list()
            .title("DAM")
            .items([
              S.documentTypeListItem("damEdition").title("Editions (gallery)"),
              S.documentTypeListItem("judge").title("Judges"),
              S.documentTypeListItem("teamMember").title("Team members"),
            ]),
        ),
    ]);
