import MapClientWrapper from "../component/MapClientWrapper";

export const dynamic = 'force-static'


export default async function Map() {

  return (

    <main style={{ height: "100vh" }}>
      <MapClientWrapper/>
    </main>
  );
}