export default function Docs({ params }: { params: { slug: string[] } }) {
  if (params.slug?.length === 2) {
    return (
      <>
        <h1>Catch all Segements Concept with [[...slug]] and not [...slug] to display http://localhost:3000/docs</h1>
        <h1>
          Viewing docs for feature {params.slug[0]} and concept {params.slug[1]}
        </h1>
      </>
    );
  } else if (params.slug?.length === 1) {
    return (
      <>
        <h1>Catch all Segements Concept with [[...slug]] and not [...slug] to display http://localhost:3000/docs</h1>
        <h1>Viewing docs for feature {params.slug[0]}</h1>
      </>
    );
  }
  return (
    <>
      <h1>Catch all Segements Concept with [[...slug]] and not [...slug] to display http://localhost:3000/docs</h1>
      <h1>Docs home page</h1>
    </>
  );
}
