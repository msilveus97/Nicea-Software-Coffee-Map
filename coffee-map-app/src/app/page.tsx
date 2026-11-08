import Link from 'next/link'

export default async function Home() {

  return (
    <div className="welcome-page">
      <div>
        <h1 className="welcome_page_header">Welcome to the Coffee Map</h1>
        <p className="welcome_page_text">
          I love coffee and learning about it.
          In 2025 I went to the Gaslight Festival in Jefferstown Kentucky.
          There was a vendor selling coffee from Australia.
          This caught me by suprise.  I took to google to find something about
          this as I had not heard anything about this before. It took a decent 30 
          minutes. My thought was during this whole process was that I boy I wish
          that there was a map with all the coffee regions around the world
          one spot with information. That is the  moment where this project was concieved.
        </p>

        <p className="welcome_page_text">
          This Coffee Map Project has the goal of having a centralized map for all the 
          different coffee regions. This is not meant to be just the country by country
          data as that can be found from many sources.  This is trying to capture the indvidual
          regions. Examples of this can commonly be found in coffees from Ethopia or Kenya.
        </p>
        
        <p className="welcome_page_text">
          This project is open source and if you have a feature request or bug report, 
          please feel free to submit an issue in the <a href="https://github.com/msilveus97/Nicea-Software-Coffee-Map/issues/">Github Repo</a>.
          Also PRs are welcome as long as they are not AI driven.  This is a personal project and I do not have the time to review an AI driven PR.
        </p>

        <p className="welcome_page_text">If you are ready to proceed to the map you can click the button below</p>
        <br/>
        <br/>
        <div>
          <Link href="/map" className="map_button">
              Proceed to Map
          </Link>
        </div>
      </div>
    </div>
  )
}