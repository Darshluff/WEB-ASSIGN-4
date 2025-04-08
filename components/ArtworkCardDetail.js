import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { favouritesAtom } from "../store";

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = () => {
    if (showAdded)
      setFavouritesList((current) => current.filter((fav) => fav !== objectID));
    else setFavouritesList((current) => [...current, objectID]);
    setShowAdded(!showAdded);
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          {data.objectDate || "N/A"} <br />
          {data.classification || "N/A"} <br />
          {data.medium || "N/A"} <br />
          <br />
          {data.artistDisplayName ? (
            <>
              {data.artistDisplayName} -{" "}
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                wiki
              </a>
            </>
          ) : (
            "N/A"
          )}
          <br />
          {data.creditLine || "N/A"} <br />
          {data.dimensions || "N/A"}
          <br />
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
