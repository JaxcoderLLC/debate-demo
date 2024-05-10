export default function ProfileDetail({ params }: { params: { id: string } }) {
  return <div>My Post: {params.id}</div>;
}
