import { useMemo, useState } from "react";

const whatsappPhone = "";

const flavors = [
  "Pistacija-malina",
  "Rafaelo",
  "Vanilija-jagoda",
  "Čokolada-nutella",
  "Čokolada-slana karamela",
  "Čokolada-višnja",
];

const initialFormData = {
  fullName: "",
  contact: "",
  pickupDate: "",
  flavor: "",
  notes: "",
};

function NaruciTortu() {
  const [formData, setFormData] = useState(initialFormData);
  const [designImage, setDesignImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setDesignImage(event.target.files?.[0] || null);
  };

  const whatsappMessage = useMemo(() => {
    const designText = designImage
      ? `${designImage.name} (sliku šaljem posebno u WhatsAppu)`
      : "Nije dodana";

    return [
      "Pozdrav, želim naručiti bento torticu.",
      "",
      `Ime i prezime: ${formData.fullName}`,
      `Email ili telefon: ${formData.contact}`,
      `Datum preuzimanja: ${formData.pickupDate}`,
      `Okus: ${formData.flavor}`,
      `Dizajn po slici: ${designText}`,
      `Napomene: ${formData.notes || "Nema napomena"}`,
      "Cijena: od 20€",
    ].join("\n");
  }, [designImage, formData]);

  const whatsappLink = useMemo(() => {
    const phonePath = whatsappPhone ? `/${whatsappPhone}` : "/";

    return `https://wa.me${phonePath}?text=${encodeURIComponent(whatsappMessage)}`;
  }, [whatsappMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="order order--page" id="narudzbe" aria-labelledby="order-title">
      <a className="back-link" href="/">
        Nazad
      </a>

      <p className="eyebrow">Narudžba tortice</p>
      <h1 id="order-title">Složimo torticu za vaš poseban trenutak.</h1>
      <p className="order__intro">
        Ispunite kratku formu, a na kraju šaljete gotovu poruku direktno na
        WhatsApp. Cijena tortice kreće od 20€.
      </p>

      <form className="order-form" onSubmit={handleSubmit}>
        <label className="order-form__field">
          <span>Ime i prezime</span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            autoComplete="name"
            required
          />
        </label>

        <label className="order-form__field">
          <span>Email ili telefon</span>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            autoComplete="email tel"
            required
          />
        </label>

        <label className="order-form__field">
          <span>Datum preuzimanja</span>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label className="order-form__field">
          <span>Okus</span>
          <select name="flavor" value={formData.flavor} onChange={handleInputChange} required>
            <option value="">Odaberite okus</option>
            {flavors.map((flavor) => (
              <option key={flavor} value={flavor}>
                {flavor}
              </option>
            ))}
          </select>
        </label>

        <label className="order-form__field order-form__field--file">
          <span>Dizajn po slici</span>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <small>{designImage ? designImage.name : "Dodajte inspiraciju ako je imate."}</small>
        </label>

        <label className="order-form__field">
          <span>Napomene</span>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="5"
            placeholder="Boje, tekst na torti, povod ili posebne želje..."
          />
        </label>

        <p className="order-form__price">Cijena od 20€</p>

        <button className="button button--dark" type="submit">
          Pošalji narudžbu na WhatsApp
        </button>
      </form>
    </section>
  );
}

export default NaruciTortu;
