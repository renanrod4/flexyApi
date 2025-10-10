
export default function Home() {
  return (
    <>
      <h1>Welcome to Flexy<span className="purple">API</span></h1>
      <p>An <span className="purple">ALL</span> purpose API for <span className="purple">WHATEVER</span> YOU WANT </p>
      <p>test it!</p>
      <div className="link">
        <a href="/api/json?context=recipes&params=name+servings+ingredients{quantity+ingredients}+countryOfOrigin&jsonlen=6"> flexy-api.vercel.app/api/json? 
          <span className="green">context</span>
          <span className="yellow">=</span>
          <span className="purple">recipes</span>
          <span className="yellow">&</span>
          <span className="green">params</span>
          <span className="yellow">=</span>
          <span className="purple">name</span>
          <span className="yellow">+</span>
          <span className="purple">servings</span>
          <span className="yellow">+</span>
          <span className="purple">ingredients</span>
          <span className="yellow">&#123;</span>
          <span className="purple">quantity</span>
          <span className="yellow">+</span>
          <span className="purple">ingredients</span>
          <span className="yellow">&#125;+</span>
          <span className="purple">countryOfOrigin</span>
          <span className="yellow">&</span>
          <span className="green">jsonlen</span>
          <span className="yellow">=</span>
          <span className="purple">6</span>
        </a>
      </div>
    </>
  );
}
