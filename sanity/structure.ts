import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("startup").title("Startups"),
      S.documentTypeListItem("playlist").title("Playlists"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("construction").title("Constructions"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("projectDetail").title("ProjectDetails"),
    ]);
