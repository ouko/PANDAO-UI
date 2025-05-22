import { Compass, DollarSign, FileText, Home, Info, Package } from "lucide-react";

export const navconfig = [
    {
      title: "Home",
      path: "/",
      icon: Home,
      exact: true,
      type: "link" 

    },
    {
      title: "Our Story",
      path: "/ourstory",
      icon: Info,
      exact: true,
      type: "link" 
    },
    {
      title: "Catalyst Suite",
      path: "/catalystsuite",
      icon: Package,
      exact: true,
      type: "link" 
    },
    {
      title: "Resources",
      path: "/resources",
      icon: FileText,
      exact: true,
      type: "link"
    },
    {
      title: "Pricing",
      path: "/price",
      icon: DollarSign,
      exact: true,
      type: "link"
    },
    {
      title: "Explore",
      path: "/explore",
      icon: Compass,
      exact: true,
      type: "link" 
    }
  ]

 export const tabs = [
    {
      id: 0,
      label: "MyProfile",
      content: "This is the MyProfile tab content.",
    },
    {
      id: 1,
      label: "UserActivity",
      content: "This is the UserActivity tab content.",
    },
    {
      id: 2,
      label: "Transaction",
      content: "This is the Transaction tab content.",
    },
    {
      id: 3,
      label: "Bonds",
      content: "This is the Community tab content.",
    },
  ];