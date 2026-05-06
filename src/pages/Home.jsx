import { useEffect, useMemo, useState } from "react";

const cakeImageModules = import.meta.glob(
  "../assets/cake_images/*.{jpeg,jpg,png,webp,avif}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const cakeImages = Object.entries(cakeImageModules)
  .sort(([firstPath], [secondPath]) => {
    const firstNumber = Number(firstPath.match(/(\d+)\./)?.[1] || 0);
    const secondNumber = Number(secondPath.match(/(\d+)\./)?.[1] || 0);

    return firstNumber - secondNumber;
  })
  .map(([, src]) => src);

function Home() {
  const [activeCake, setActiveCake] = useState(0);
  const visibleCake = cakeImages[activeCake];

  useEffect(() => {
    if (cakeImages.length < 2) {
      return undefined;
    }

    const autoplay = window.setInterval(() => {
      setActiveCake((current) => (current + 1) % cakeImages.length);
    }, 4200);

    return () => window.clearInterval(autoplay);
  }, []);

  const carouselLabel = useMemo(
    () => `${activeCake + 1} / ${cakeImages.length}`,
    [activeCake],
  );

  return (
    <>
      <section className="home-logo" aria-label="Tortice Bento Torte">
        <img
          className="home-logo__brand"
          src="/logo.jpg"
          alt="Tortice Bento Torte logo"
        />
      </section>

      <section className="home-info" aria-labelledby="home-info-title">
        <p className="home-info__lead">Iz male kuhinje u posebne trenutke.</p>
        <h2 id="home-info-title">
          Tortice su nastale iz ljubavi prema slatkom.
        </h2>
        <p>
          U Perušiću, u maloj kuhinji, rodio se brend koji svaku tortu želi
          pretvoriti u nešto više od deserta. Svaka tortica izrađuje se polako,
          s puno pažnje i ljubavi, kako bi vaš poseban trenutak dobio baš onaj
          nježni, slatki dodatak koji se pamti.
        </p>
        <p className="home-info__note">
          Ručni rad. Osobna poruka. Torta samo za vas.
        </p>
      </section>

      <section className="cake-carousel" aria-labelledby="cake-carousel-title">
        <div className="cake-carousel__top">
          <p className="eyebrow">Galerija tortica</p>
          <p className="cake-carousel__count">{carouselLabel}</p>
        </div>

        <h2 id="cake-carousel-title">Neke ideje već su postale tortice.</h2>

        <div className="cake-carousel__frame" aria-live="polite">
          {visibleCake && (
            <img
              key={visibleCake}
              src={visibleCake}
              alt={`Primjer bento tortice ${activeCake + 1}`}
              className="cake-carousel__image"
            />
          )}
        </div>

        <div className="cake-carousel__progress" aria-hidden="true">
          {cakeImages.map((image, index) => (
            <span
              key={image}
              className={index === activeCake ? "is-active" : ""}
            />
          ))}
        </div>
      </section>

      <section className="home-copy" aria-labelledby="hero-title">
        <p className="eyebrow">Ručno rađene mini torte</p>
        <h1 id="hero-title">Mala torta. Veliki trenutak.</h1>
        <p>
          Personalizirane bento tortice za rođendane, poklone i slatke poruke
          koje se pamte.
        </p>

        <a className="button" href="/naruci-tortu">
          Naruči tortu
        </a>
      </section>
    </>
  );
}

export default Home;
