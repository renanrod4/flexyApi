import { HiOutlineSparkles } from "react-icons/hi2";
import './page.css';


export default function Home() {
  return (
    <>
      <main>
        <section>
          <div className="content">
            <div className="tag" >
              <HiOutlineSparkles size={18} color="var(--primary)" />
              <span>Ai-powered JSON generated</span>
            </div>
            <div className="title">
              <h1>Flexy API The API of <br /></h1>
              <h1><span>EVERYTHING</span></h1>
            </div>
            <p>
              Generate any JSON data structure you need with AI.
              From recipes to user profiles,
              from product catalogs to cars information —flexy-api makes it easy.
            </p>
            <div className="buttons">
              <button className="get-started">Get started</button>
              <button className="view-doc">View Documentation</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
