import "../assets/css/button-loader.css";

export default function ButtonLoader() {
  return (
    <button
      disabled
      type="submit"
      className="bg-green-500 w-full text-white p-2 border-[1px] border-border_color rounded hover:border-green-500  hover:shadow transition-all duration-200 h-[41px]"
    >
      <section className="dots-container">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </section>
    </button>
  );
}
