import NewProduct from "./New";

export default function NewProductPage() {
  return (
    <section className="flex flex-col gap-5 p-4">
      <article className="bg-white dark:bg-gray-900 rounded shadow p-4">
        <NewProduct />
      </article>
    </section>
  );
}