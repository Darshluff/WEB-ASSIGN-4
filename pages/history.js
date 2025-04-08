import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/history.module.css";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [parsedHistory, setParsedHistory] = useState([]);

  useEffect(() => {
    const history = searchHistory.map((h) =>
      Object.fromEntries(new URLSearchParams(h))
    );
    setParsedHistory(history);
  }, [searchHistory]);

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory((current) => current.filter((_, i) => i !== index));
  };

  if (!parsedHistory.length) {
    return (
      <Card>
        <Card.Body>Nothing Here. Try searching for some artwork.</Card.Body>
      </Card>
    );
  }

  return (
    <ListGroup>
      {parsedHistory.map((item, index) => (
        <ListGroup.Item
          key={index}
          className={styles.historyListItem}
          onClick={(e) => historyClicked(e, index)}
        >
          {Object.keys(item).map((key) => (
            <span key={key}>
              {key}: <strong>{item[key]}</strong>&nbsp;
            </span>
          ))}
          <Button
            variant="danger"
            size="sm"
            className="float-end"
            onClick={(e) => removeHistoryClicked(e, index)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
