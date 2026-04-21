export default async function UserProfile({ params }) {
  const { id } = await params;

  return (
    <section className="flex flex-1 flex-col gap-4">
      <h1 className="text-3xl font-semibold">User Profile: {id}</h1>
    </section>
  );
}
