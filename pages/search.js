import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";

export default function AdvancedSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // Jotai atom for search history
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = (data) => {
    let queryString = `searchBy=true&q=${data.q}`;
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}`;

    // Update search history with the new query
    setSearchHistory((current) => [...current, queryString]);

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group>
        <Form.Label>Query</Form.Label>
        <Form.Control
          {...register("q", { required: true })}
          className={errors.q ? "is-invalid" : ""}
        />
        {errors.q && (
          <Form.Control.Feedback type="invalid">
            Query is required.
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Geo Location</Form.Label>
        <Form.Control {...register("geoLocation")} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Medium</Form.Label>
        <Form.Control {...register("medium")} />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Check
          type="checkbox"
          label="Is On View"
          {...register("isOnView")}
        />
        <Form.Check
          type="checkbox"
          label="Is Highlight"
          {...register("isHighlight")}
        />
      </Form.Group>

      <Button type="submit" className="mt-3">
        Search
      </Button>
    </Form>
  );
}
