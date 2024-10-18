"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ConversationContextType {
allConversationContext: any;
thisConversationContext: number;
addConversation: (newConversation: any) => void;
setThisConversation: (thisConversation: number) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(
undefined
);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({
children,
}) => {
const [thisConversationContext, setThisConversationContext] = useState(null);
const [allConversationContext, setAllConversationContext] = useState([
{ id: 1, title: "Starting my first AI project", date: "2024-06-26" },
{
id: 2,
title: "Ideas for mobile applications",
date: "2024-06-27",
},
{ id: 3, title: "Learn reacts for beginners", date: "2024-06-28" },
{
id: 4,
title: "Productivity tips for developers",
date: "2024-06-29",
},
{
id: 5,
title: "Mengelola Tim Remote dengan Efektif",
date: "2024-06-30",
},
{ id: 6, title: "Pengantar ke Machine Learning", date: "2024-07-01" },
{
id: 7,
title: "Meningkatkan Keterampilan Pemrograman",
date: "2024-07-02",
},
{ id: 8, title: "Digital Marketing Strategy", Date: "2024-06-25"},
{id: 9, title: "Build fire with node.js", date: "2024-05-25"},
{id: 10, title: "Designing an Interesting UI/UX", Date: "2024-04-25"},
{id: 11, title: "SEO Optimization for Website", Date: "2024-07-03"},
{id: 12, title: "Developing Games With Unity", Date: "2024-07-04"},
{id: 13, title: "Know Cloud Computing", Date: "2024-07-05"},
{id: 14, title: "Automation with Python", Date: "2024-07-06"},
{id: 15, title: "Data Analysis Techniques", Date: "2024-07-07"},
{id: 16, title: "Basics of Cybersecurity", Date: "2024-07-08"},
{id: 17, title: "Introduction to Devops", Date: "2024-07-09"},
{id: 18, title: "Building Responsive Website", Date: "2024-07-10"},
{id: 19, title: "advanced machine learning technique", date: "2024-07-11"},
{id: 20, title: "Utilie Big Data", Date: "2024-07-12"},
{id: 21, title: "Application of IoT in Industry", Date: "2024-07-13"},
{id: 22, title: "Basics of Kubernetetes", Date: "2024-07-14"},
{ID: 23, title: "Docker Guide for Beginners", Date: "2024-07-15"},
{id: 24, title: "applicationMonetizationStrategy", date: "2024-07-16" },
{
id: 25,
title: "Functional Programming with Scala",
date: "2024-07-17",
},
]);

const addConversation = (newConversation: any) => {
setAllConversationContext((prevConversations) => [
...prevConversations,
newConversation,
]);
};

const setThisConversation = (thisConversation: number) => {
setThisConversationContext(thisConversation);
};

return (
<ConversationContext.Provider
value={{
allConversationContext,
addConversation,
thisConversationContext,
setThisConversation,
}}
>
{children}
</ConversationContext.Provider>
);
};

export const useConversation = (): ConversationContextType => {
const context = useContext(ConversationContext);
if (!context) {
throw new Error(
"useConversation must be used within a ConversationProvider"
);
}
return context;
};