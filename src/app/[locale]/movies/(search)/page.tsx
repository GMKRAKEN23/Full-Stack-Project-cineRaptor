import SearchResults from "./SearchResults";

interface GenreIdPageProps {
    params: {
        id: string;
        locale: "en" | "fr"; 
    };
    searchParams: Record<string, string | undefined>;
    isLiked: boolean;
    onLikeToggle: () => void; 
}

export default function MoviesPage({ params, searchParams, isLiked, onLikeToggle }: GenreIdPageProps) {
    const { id: genreId, locale } = params;

    return (
        <SearchResults 
            searchParams={searchParams} 
            locale={locale} 
            genreId={genreId} 
            isLiked={isLiked} 
            onLikeToggle={onLikeToggle} 
        />
    );
}
