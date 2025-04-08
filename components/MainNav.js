import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MainNav() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsExpanded(false);
    if (search) {
      const queryString = `searchBy=true&q=${search}`;
      setSearchHistory((current) => [...current, queryString]);
      router.push(`/artwork?${queryString}`);
    }
  };

  return (
    <>
      <Navbar
        fixed="top"
        bg="primary"
        variant="dark"
        expand="lg"
        expanded={isExpanded}
      >
        <Navbar.Brand>Darsh Parmar</Navbar.Brand>
        <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link
                onClick={() => setIsExpanded(false)}
                active={router.pathname === "/"}
              >
                Home
              </Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link
                onClick={() => setIsExpanded(false)}
                active={router.pathname === "/search"}
              >
                Advanced Search
              </Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="outline-light">
              Search
            </Button>
          </Form>
          &nbsp;
          <Nav>
            <NavDropdown title="User Name">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/favourites"}
                >
                  Favourites
                </NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/history"}
                >
                  Search History
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
}
