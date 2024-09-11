import "./style.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen((item) => !item);
  }

  return (
    <div>
      <div className="accordion">
        {faqs.map((faq, i) => (
          <AccordionItem faq={faq} number={i} key={i} onAddOpen={handleOpen} isOpen={isOpen}/>
        ))}
      </div>
    </div>
  );
}

function AccordionItem({ faq, number, handleOpen, isOpen }) {
  return (
    <div className={isOpen ? "item open" : "item"} onClick={handleOpen}>
      <p className="number">{`0${number + 1}`}</p>
      <p className="title">{faq.title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{faq.text}</div>}
      {/* <div className={isOpen ? "content-box" : "hidden"}>{faq.text}</div> */}
    </div>
  );
}
