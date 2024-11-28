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
    <div className="min-h-screen flex flex-col items-start   text-black max-w-[1000px] mx-auto mb-20">
      <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5">
        <div className="text-4xl font-semibold">Video Guide</div>
        <p className="md:w-2/3 font-thin">Don&apos;t know where to start?</p>
      </div>
      <div className="w-full md:h-[90vh] px-2">
        <ReactPlayer
          url="https://youtu.be/6cDtHjgpCyE?si=ZJSmDCNT80mOSbPi"
          className=" w-full h-full"
          width="100%"
          height="100%"
        />{' '}
      </div>

      <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5 mt-6">
        <div className="text-4xl font-semibold">Get Information</div>
        <p className="md:w-2/3 font-thin">
     Don&apos;t know where to start? Explore insightful blogs about the PandaO platform and the AboutActus initiative
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
        <div className="p-5 grid md:grid-cols-3 grid-cols-1 w-full max-w-[1000px] mx-auto gap-7">
          {posts.map((post, index) => (
            <ResourceCard key={index} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ResourceSection
