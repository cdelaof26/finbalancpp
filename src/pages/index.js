import AppContainer from "@/pages/components/app_container";
import Sidebar from "@/pages/components/sidebar";

export default function Home() {
    let container_func = AppContainer();
    let sidebar = Sidebar(true, container_func[1]);

    return (
        <main className="flex w-full h-dvh">
            {container_func[0]}
            {sidebar}
        </main>
    );
}
