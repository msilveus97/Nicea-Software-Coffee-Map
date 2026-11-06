import Link from 'next/link'

export default function Sources() {
    return (
        <div>
            <h2 className="other_link_header_style">Sources List</h2>
            <div>This is a list of data sources and maps used to create maps and fill in data</div>
            <h4 className="other_link_header_style">Ethopia Map Resources</h4>
            <Link href='https://commons.wikimedia.org/wiki/File:Ethiopia_Coffee_Map.png'>Ethopia Coffee Region Wikimedia Map (https://commons.wikimedia.org/wiki/File:Ethiopia_Coffee_Map.png)</Link>
            <h4 className="other_link_header_style">Nepal Map Resources</h4>
            <div className="link_container_style">
                <Link href="https://github.com/opentechcommunity/map-of-nepal">- Open Tech Community Map Objects (https://github.com/opentechcommunity/map-of-nepal) </Link><br/>
                <Link href="https://nepalitimes.com/caffeine-buzz">- Caffeine Buzz Nepal Coffee Region Map (https://nepalitimes.com/caffeine-buzz)</Link>
            </div>

        </div>
    )
}