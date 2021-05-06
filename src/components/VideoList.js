import VideoCard from "./VideoCard";


// const videoIds = [
//   "0P3Gt-60yLc",
//   "AVM4J0qvdKw",
//   "5eIhSCFnvPc",
//   "PJWemSzExXs",
//   "7YbfDiCC-qk",
//   "jJPMnTXl63E",
// ];

const videoList = [
  {
    title:
      "Piyush Bhisekar - Tum Aao Baitho Batein Kare (Official Lyric Video)",
    id: "5eIhSCFnvPc",
  },
  {
    title: "Hai Bharosa | Jukebox | Piyush Bhisekar",
    id: "Prr6c5ybqrs",
  },
  {
    title: "Anuv Jain - MISHRI (Studio)",
    id: "0P3Gt-60yLc",
  },
  {
    title:
      "Dhaaga | Tvf Aspirants | Full HD Song | Sandeep Bhaiya | Abhilash | Upsc Aspirants | Nilotpal Bora |",
    id: "AVM4J0qvdKw",
  },
  {
    title: "BAARISHEIN (Studio) Anuv Jain",
    id: "PJWemSzExXs",
  },
  {
    title:
      "Nit Nit (Full Song) | Jasleen Royal | New Punjabi Song 2020 | White Hill Music",
    id: "7YbfDiCC-qk",
  },
];

export default function VideoList() {
  return (
    <div class="grid-container web-three mob-two">
     { videoList.map(({ title, id}) => <VideoCard videoId={id} title={title} playlistCard={false} playlistName={""} />)}
    </div>
  )
}