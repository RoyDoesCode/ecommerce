import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard(
        "6916b00f-e800-4c3c-989b-fc9546f8fc21"
    );

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
            </div>
        </Container>
    );
};

export default HomePage;
