import Header from "../../components/Header";

const usersIndex = () => {
    return (
        <>
            <Header currentPage="users"></Header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    Users index
                </div>
            </main>
        </>
    );
}

export default usersIndex;