import { Link } from 'react-router-dom';

export default function NoPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-black dark:text-white">
      <p className="my-7 text-xl lg:text-3xl">Seems you are lost!</p>
      <Link
        to="/"
        className=" hover:font-bold ml-3 p-2 border-[1px] border-border_color rounded hover:border-green-500  hover:shadow transition-all duration-200 no-underline hover:no-underline"
      >
        Go Back Home
      </Link>
    </div>
  );
}
