import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <article>
      <h1 className={title()}>Soy Lis, Escritora</h1>
      <h3 className={subtitle()}>Un placer conocerte</h3>
    </article>
  );
}
