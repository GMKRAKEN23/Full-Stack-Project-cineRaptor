import { getMovieByPath } from "@/utils/movieClient";
import { notFound } from "next/navigation";
import MovieDetails from "@/components/Movie-details/MovieDetails";
import SimilarMovies from "@/components/Similar-movies/SimilarMovies";
import { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

interface MoviesIdPageProps{
    params: {
        id: string;
        locale: string;
        isLiked: boolean;
        onLikeToggle: () => void; 
    } 
}

export default async function MoviesIdPage( {params: {id, locale, isLiked, onLikeToggle}}:  MoviesIdPageProps){
    const movie = await getMovieByPath(`/movie/${id}`, [], locale);

    if(!movie.original_title){
        return notFound();
    }
    
    return(
        <div>
            <MovieDetails movie={movie} locale={locale} />
            <Suspense fallback={<p>Loading ...</p>}>
                <SimilarMovies movieId={movie.id} locale={locale} isLiked={isLiked} onLikeToggle={onLikeToggle}/>
            </Suspense>     
        </div>
    )
}