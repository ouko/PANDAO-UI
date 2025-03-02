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
      path: "catalystsuite",
      icon: Package,
      exact: true,
      type: "scroll" 
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