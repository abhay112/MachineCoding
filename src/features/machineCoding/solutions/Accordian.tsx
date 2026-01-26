import { useState } from 'react'

const items = [
  {
    id: 1,
    title: "What is React?",
    content: "React is a JavaScript library for building user interfaces."
  },
  {
    id: 2,
    title: "What are Hooks?",
    content: "Hooks let you use state and other React features without writing classes."
  },
  {
    id: 3,
    title: "What is Virtual DOM?",
    content: "Virtual DOM is a lightweight copy of the real DOM."
  }
];



const Accordian = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleSetIndex = (index: number) => {
        if(activeIndex === index){
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    }


  return (
    <div>
        {items?.map((item) =>{
            return(
                <div>
                <details key={item.id} className="mb-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <summary className="cursor-pointer px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium">
                    {item.title}
                  </summary>
                  <div className="px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    {item.content}
                  </div>
                </details>
                </div>
            )
        })}



        {items?.map((item) => {

          return (
            <div onClick={() => handleSetIndex(item.id)} key={item.id}>
                <p>{item.title}</p>
                <p style={{display: activeIndex === item.id ? 'block' : 'none'}}>{item.content}</p>
            </div>
          )  
        })}
    </div>
  )
}

export default Accordian