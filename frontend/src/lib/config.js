import { Compass, DollarSign, FileText, Home, Info, Package } from "lucide-react";

export const navconfig = [
    {
      title: "Home",
      path: "/",
      icon: Home,
      exact: true
    },
    {
      title: "Our Story",
      path: "/ourstory",
      icon: Info,
      exact: true
    },
    {
      title: "Catalyst Suite",
      path: "/catalystsuite",
      icon: Package,
      exact: true
    },
    {
      title: "Resources",
      path: "/resources",
      icon: FileText,
      exact: true
    },
    {
      title: "Pricing",
      path: "/price",
      icon: DollarSign,
      exact: true
    },
    {
      title: "Explore",
      path: "/explore",
      icon: Compass,
      exact: true
    }
  ]