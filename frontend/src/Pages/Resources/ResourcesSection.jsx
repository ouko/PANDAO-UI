import ReactPlayer from 'react-player'
import ResourceCard from './Resourcard'
import { useEffect, useState } from 'react'

const ResourceSection = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          query Publication {
            publication(host: "what-is-actus.hashnode.dev") {
              isTeam
              title
              posts(first: 10) {
                edges {
                  node {
                    title
                    brief
                    url
                           publishedAt
                    coverImage {
                      attribution
                      photographer
                      url
                    }
                    readTimeInMinutes
                    slug
                  }
                }
              }
            }
          }
        `

        const response = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })

        const data = await response.json()

        if (data.errors) {
          throw new Error(data.errors[0].message)
        }

        const fetchedPosts = data.data.publication.posts.edges.map(
          (edge) => edge.node,
        )
        setPosts(fetchedPosts)
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to fetch blog posts')
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  console.log(posts)
  return (
    <div className="min-h-screen flex flex-col z-50 pb-20 pt-20 items-start max-w-[1000px] mx-auto mb-2">

      <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5">
        <div className="text-5xl font-semibold z-50 bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent">Video Guide</div>
        <p className="md:w-2/3 text-brand7 z-50 font-thin">Don&apos;t know where to start?</p>
      </div>
      <div className="w-full md:h-[60vh] h-[30vh]  px-2 z-50">
        <ReactPlayer
          url="https://youtu.be/6cDtHjgpCyE?si=ZJSmDCNT80mOSbPi"
          className=" w-full z-50 rounded-2xl h-full"
          width="100%"
          height="100%"
        />{' '}
      </div>

      <div className="flex flex-col  items-start z-50 gap-5 justify-center w-full p-5 mt-6">
        <div className="text-5xl text-brand7 font-semibold">Get Information</div>
        <p className="md:w-2/3 z-50 text-brand7 font-thin">
          Don&apos;t know where to start? Explore insightful blogs about the
          PandaO platform and the AboutActus initiative
        </p>
      </div>
      {loading && (
        <div className="w-full p-5 text-center">
          <div className="animate-pulse text-gray-500">Loading posts...</div>
        </div>
      )}
      {/* {!loading && !error && (
        <div className="p-5 grid md:grid-cols-3 grid-cols-1 w-full gap-7">
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      )} */}
      {!loading && !error && (
        <div className="p-5 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {posts.map((post, index) => (
            <div key={index} className="z-40 w-full">
              <ResourceCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResourceSection
