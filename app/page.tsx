'use client'
import { HiOutlineSparkles } from "react-icons/hi2";
import { FiDatabase } from "react-icons/fi";
import { LuBraces } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";


import './page.css';
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <>
      <main>
        <Section className="intro" >
          <div className="tag" >
            <HiOutlineSparkles size={18} color="var(--primary)" />
            <span>Ai-powered JSON generated</span>
          </div>
          <h1 className="title">Flexy API, The API of <br /><span>EVERYTHING</span></h1>
          <p className="description">Generate any JSON data structure you need with AI.From recipes to user profiles,
            from product catalogs to cars information —flexy-api makes it easy.</p>

          <div className="buttons">
            <button className="get-started" onClick={() => router.push('#try')}> Get started </button>
            <button className="view-doc" onClick={() => router.push("#howitworks")}> View Documentation </button>
          </div>
        </Section>

        <Section className="how-it-works">
          <h2 className="title">How It Works</h2>
          <p className="description">Build your perfect API endpoint with three simple parameters</p>
          <div className="cards">
            <Code />
            <Card icon={<FiDatabase size={25} />} title={'context'} description={'Give context to the AI about what kind of data you want to generate. This helps the AI understand the domain and create realistic, relevant data.'} code={'Example: recipes, users, products'} color={'purple'} optional={false} />
            <Card icon={<LuBraces size={25} />} title={'params'} description={'Define the structure of each JSON object. Use + to separate fields, {} for nested objects, and [] for arrays. The AI will generate data matching your exact schema.'} code='name+address{street+city}+tags[name]' color={'green'} optional={false} />
            <Card icon={<FaListUl size={25} />} title={'jsonlen'} description={'Specify how many items you want in your JSON array. If not provided, the AI will decide the optimal quantity based on your context.'} code={'Example: recipes, users, products'} color={'red'} optional={true} />
          </div>

        </Section>
      </main>
    </>
  );
}

type SectionType = {
  children: React.ReactNode,
  className?: string,
}

function Section({ children, className }: SectionType) {
  return (
    <section className={className}>
      <div className="content">
        {children}
      </div>
    </section>
  )
}

type CardType = {
  icon: React.ReactNode,
  title: string,
  description: string,
  code: string,
  color: string,
  optional: boolean,
}

function Code() {
  return (

    <div className="card code">
      <p>flexy-api.vercel.app/api/json?
        <span className="purple">context</span>
        =recipes&<span className="green">params</span>
        =name:str+servings:int+ingredients&#123;quantity+ingredient&#125;+countryOfOrigin
        <span className="optional">&<span className="red">jsonlen</span>=6</span></p>
    </div>
  )
}

function Card({ icon, title, description, code, color, optional }: CardType) {
  return (
    <div className={`card ${color}`}>
      <div className="content">
        <div className={`icon ${color}`}>{icon}</div>
        <h3>{title} {optional && <span>(optional)</span>}</h3>

        <p>{description}</p>
      </div>
      <span>{code}</span>
    </div>
  )
}