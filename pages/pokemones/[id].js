import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Pokemon = ({ data }) => {
    const router = useRouter()
    console.log(router)

    // if (router.isFallback) {
    //     return <p>Loading...</p>
    // }

    return (
        <div>
            <h1>{data.name} number #{data.id}</h1>
            <Image src={data.sprites.front_default} width={400} height={400} />
            <Link href="/">Go home</Link>
        </div>
    )
}

export default Pokemon

// exportando esta propiedad hacemos server side rendering
export const getStaticProps = async ({ params }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { id: '1' } },
        { params: { id: '2' } },
    ]
    return {
        paths,
        fallback: 'blocking', // genera primero el html y luego devuelve la pagina renderizada por next, en este metodo no hace falta usar el routing
        // fallback: true, //si esta en true va a intentar renderizar la pagina pero de manera lazy
    }
}

// export const getServerSideProps = async ({ params }) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
//     const data = await response.json()

//     return { props: { data } }
// }