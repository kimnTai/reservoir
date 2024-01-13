import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as { statusText: string };
  console.log(error);

  return (
    <div>
      <h1>哎呀！</h1>
      <p>抱歉，發生了意外錯誤。</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
}
