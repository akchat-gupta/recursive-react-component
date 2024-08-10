export type Node = {
  name: string;
  nodes?: Node[];
  icon?: string;
};

export const nodes = [
  {
    name: "Home",
    icon: "FolderClosed",
    nodes: [
      {
        name: "Movies",
        icon: "FolderClosed",
        nodes: [
          {
            name: "Action",
            icon: "FolderClosed",
            nodes: [
              {
                name: "2000s",
                icon: "FolderClosed",
                nodes: [
                  { name: "Gladiator.mp4", icon: "FileVideo2" },
                  { name: "American Beauty.mp4", icon: "FileVideo2" },
                ],
              },
              { name: "2010s", icon: "FolderClosed" },
            ],
          },
          {
            name: "Thriller",
            icon: "FolderClosed",
            nodes: [
              { name: "2000s", icon: "FolderClosed" },
              { name: "2010s", icon: "FolderClosed" },
            ],
          },
          { name: "Comedy", icon: "FolderClosed" },
        ],
      },
      {
        name: "Music",
        icon: "FolderClosed",
        nodes: [
          { name: "Rock", icon: "FolderClosed" },
          { name: "Classical", icon: "FolderClosed" },
          { name: "Hip Hop", icon: "FolderClosed" },
        ],
      },
      { name: "Pictures", icon: "FolderClosed" },
      { name: "Document", icon: "FolderClosed" },
      { name: "password.txt", icon: "FileText" },
    ],
  },
];
