import React from 'react'
import { Link } from 'react-router-dom'

const TopCity = () => {
  return (
    <>
    <section className="bg-light">
  <article className="container pt-4 pb-4">
    <h4>Top cities</h4>
    <div className="row cityLink border-bottom border-1 mt-3 mb-3">
      <div className="col">
        <ul className="list-unstyled">
          <li>
            <Link>Berlin</Link>
          </li>
          <li>
            <Link>Bremen</Link>
          </li>
          <li>
            <Link>Dortmund</Link>
          </li>
          <li>
            <Link>Dresden</Link>
          </li>
        </ul>
      </div>
      <div className="col">
        <ul className="list-unstyled">
          <li>
            <Link>Duisburg</Link>
          </li>
          <li>
            <Link>Dusseldorf</Link>
          </li>
          <li>
            <Link>Eat</Link>
          </li>
          <li>
            <Link>Frankfurt am Main</Link>
          </li>
        </ul>
      </div>
      <div className="col">
        <ul className="list-unstyled">
          <li>
            <Link>Hamburg</Link>
          </li>
          <li>
            <Link>Hanover</Link>
          </li>
          <li>
            <Link>Cologne</Link>
          </li>
          <li>
            <Link>Leipzig</Link>
          </li>
        </ul>
      </div>
      <div className="col">
        <ul className="list-unstyled">
          <li>
            <Link>Munich</Link>
          </li>
          <li>
            <Link>Nuremberg (Central Fri)</Link>
          </li>
          <li>
            <Link>Saarbrücken</Link>
          </li>
          <li>
            <Link>Stuttgart</Link>
          </li>
        </ul>
      </div>
    </div>
    <h4>Important Info</h4>
    <p align="justify">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </article>
</section>

    </>
  )
}

export default TopCity