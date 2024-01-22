import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios';
import Head from 'next/head'
import { useEffect } from 'react'

const Home = () => {

    useEffect(() => {
		const fetchMovies = async() => {
			console.log("fetchMovies start");
			try {
				const response = await axios.get('api/getPopularMoives'); // apiエンドポイント呼び出し
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
		fetchMovies();
    }, []);
    
    return (
        <AppLayout
					header={
						<h2 className="font-semibold text-xl text-gray-800 leading-tight">
								home
						</h2>
					}>
					<Head>
							<title>Laravel - home</title>
					</Head>

					<div className="py-12">
						<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
							<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
								<div className="p-6 bg-white border-b border-gray-200">
									You're logged in!
								</div>
							</div>
						</div>
					</div>
        </AppLayout>
    )
}

export default Home
