import { Card } from '@/components/ui/card'
import { Book, BookDashed, Lock, Rss } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ResourceCard = ({ title, link }) => {
  const navigate = useNavigate()
  return (
    <Card
      className="rounded-3xl shadow-sm group  group-hover:shadow-2xl cursor-pointer"
      onClick={() => navigate(link)}
    >
      <div className="p-6  ">
        <p className="">{title}</p>
      </div>

      <div className="bg-gradient-to-r from-indigo-500  group-hover:from-indigo-400 to-purple-500 group-hover:to-purple-600 duration-300 transition-transform h-[150px] flex items-center justify-center rounded-b-3xl">
        <Rss className="text-white h-16 w-16" />
      </div>
    </Card>
  )
}

export default ResourceCard
