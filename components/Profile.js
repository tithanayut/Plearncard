const Profile = (props) => {
	return (
		<div className="flex flex-col justify-center items-center h-32 bg-gray-100">
			<p className="text-lg text-gray-600 font-bold">Hello,</p>
			<p className="flex items-center text-2xl text-gray-600 font-bold">
				<svg
					className="w-8 h-8 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				{props.username}
			</p>
		</div>
	);
};

export default Profile;
