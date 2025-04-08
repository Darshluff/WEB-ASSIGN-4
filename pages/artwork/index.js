import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import ArtworkCard from "../../components/ArtworkCard";
import Error from "next/error";
import useSWR from "swr";
import validObjectIDList from "../../public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  const finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    finalQuery
      ? `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&${finalQuery}`
      : null
  );

  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data && data.objectIDs) {
      const filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs.includes(x)
      );
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    } else {
      setArtworkList([]);
    }
  }, [data]);

  if (error) return <Error statusCode={404} />;

  if (!data) {
    return null; // or a loading indicator if preferred
  }

  if (!artworkList.length) {
    return (
      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>
          Search for something else.
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Row className="gy-4">
        {artworkList[page - 1]?.map((objectID) => (
          <Col lg={3} key={objectID}>
            <ArtworkCard objectID={objectID} />
          </Col>
        ))}
      </Row>

      {artworkList.length > 1 && (
        <Row>
          <Col>
            <Pagination className="justify-content-center my-4">
              <Pagination.Prev
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page <= 1}
              />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next
                onClick={() =>
                  setPage((p) => Math.min(p + 1, artworkList.length))
                }
                disabled={page >= artworkList.length}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
