import Card from "./components/cards/Cards";

export default function Home() {
    return (
        <div className="container mx-auto mt-8 flex gap-3">
            <Card id="1"/>
            <Card id="2"/>
            <Card id="3"/>
        </div>
    );
}
