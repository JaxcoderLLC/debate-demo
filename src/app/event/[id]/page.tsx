export default function EventDetail({ params }: { params: { id: string } }) {
  return <div>My Post: {params.id}</div>;
}
