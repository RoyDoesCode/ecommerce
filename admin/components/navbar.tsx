import { MainNav } from "@/components/mainNav";
import { StoreSwitcher } from "@/components/storeSwitcher";
import { ThemeToggle } from "@/components/themeToggle";
import useUser from "@/hooks/useUser";
import prismadb from "@/lib/prismadb";
import { UserButton } from "@clerk/nextjs";

export const Navbar = async () => {
    const userId = useUser();

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />

                <MainNav className="mx-6" />

                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};
