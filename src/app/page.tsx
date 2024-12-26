"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown, Warehouse, Users, Tractor, FileText, Phone, Mail, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import NextImage from 'next/image';

const navigation = ['accueil', 'activites', 'galerie', 'ressources', 'documents'];

type FarmImage = {
  src: string;
  alt: string;
  category: 'ferme' | 'elevage' | 'culture' | 'equipe' | 'materiel';
 };
 
// Images catégorisées
const farmImages: FarmImage[] = [
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/farm-images/ferme1.jpg`, alt: 'Vue de la ferme', category: 'ferme' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/farm-images/elevage.jpg`, alt: 'Élevage', category: 'elevage' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/farm-images/culture.jpg`, alt: 'Cultures', category: 'culture' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/farm-images/equipe.jpg`, alt: 'Notre équipe', category: 'equipe' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/farm-images/materiel.jpg`, alt: 'Équipements', category: 'materiel' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/farm-images/recolte.jpg`, alt: 'Récoltes', category: 'culture' }
];

const farmVideos = [
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/videos/farm-videos/presentation.mp4`, title: 'Présentation de la ferme' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/videos/farm-videos/activities.mp4`, title: 'Nos activités quotidiennes' },
];

const NavButton = ({ isOpen, toggle, scrolled }: { isOpen: boolean; toggle: () => void; scrolled: boolean }) => (
  <button
    onClick={toggle}
    className="group relative h-10 w-10 md:hidden rounded-full hover:bg-green-50"
    aria-label="Menu principal"
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={`w-6 h-6 flex flex-col justify-center items-center transition-all duration-300 ${isOpen ? 'transform rotate-180' : ''}`}>
        {isOpen ? (
          <X size={24} className={scrolled ? 'text-green-800' : 'text-white'} />
        ) : (
          <MenuIcon size={24} className={scrolled ? 'text-green-800' : 'text-white'} />
        )}
      </div>
    </div>
  </button>
 );

const FarmWebsite = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [activeSection, setActiveSection] = useState('accueil');
 const [selectedImage, setSelectedImage] = useState<FarmImage | null>(null);
 const [scrolled, setScrolled] = useState(false);
 const [activeFilter, setActiveFilter] = useState('tout');

 useEffect(() => {
   const handleScroll = () => {
     setScrolled(window.scrollY > 50);
   };

   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const handleDownload = (fileName: string) => {
   const link = document.createElement('a');
   link.href = `/documents/${fileName}`;
   link.download = fileName;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
 };

 return (
   <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
     {/* Header avec parallax */}
     <header className="relative h-[70vh] overflow-hidden">
       <div className="absolute inset-0 bg-[url('/images/farm-header.jpg')] bg-cover bg-center bg-no-repeat transform scale-110" 
            style={{ transform: `translateY(${scrolled ? '10%' : '0'}) scale(${scrolled ? 1.1 : 1})`, transition: 'all 0.5s ease-out' }}>
         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
       </div>
       <div className="relative h-full flex items-center justify-center text-center text-white p-4">
         <div className="max-w-4xl mx-auto transform translate-y-[-10%]">
           <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">Ferme MOKPOKPO</h1>
           <p className="text-xl md:text-2xl text-gray-200 animate-fade-in-delayed">
             Une ferme intégrée pour l&apos;autosuffisance alimentaire
           </p>
         </div>
       </div>
     </header>

     {/* Navigation sophistiquée */}
     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
       scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
     }`}>
       <div className="container mx-auto px-4">
         <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg rotate-45 overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                <span className="text-white text-lg font-bold">FM</span>
              </div>
            </div>
            <div className="font-sans">
              <h1 className={`text-xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-green-800' : 'text-white'
              }`}>
                <span className="font-light">Ferme</span> 
                <span className="font-extrabold tracking-wider">MOKPOKPO</span>
              </h1>
            </div>
          </div>
           
          <NavButton 
            isOpen={isMenuOpen} 
            toggle={() => setIsMenuOpen(!isMenuOpen)}
            scrolled={scrolled} 
          />
           
           <div className="hidden md:flex space-x-6">
             {navigation.map((item) => (
               <Button
                 key={item}
                 variant="ghost"
                 className={`transition-all duration-300 ${
                   scrolled
                     ? activeSection === item
                       ? 'bg-green-100 text-green-800 hover:bg-green-200'
                       : 'text-gray-800 hover:bg-green-50'
                     : 'text-white hover:bg-white/20'
                 }`}
                 onClick={() => setActiveSection(item)}
               >
                 {item.charAt(0).toUpperCase() + item.slice(1)}
               </Button>
             ))}
           </div>
         </div>

         {/* Menu mobile avec animation */}
         <div className={`${
           isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
         } md:hidden overflow-hidden transition-all duration-500 ease-in-out`}>
           <div className="py-4 space-y-2">
             {navigation.map((item) => (
               <Button
                 key={item}
                 variant="ghost"
                 className={`w-full justify-start text-left transition-colors ${
                   activeSection === item
                     ? 'bg-green-100 text-green-800'
                     : 'text-gray-800 hover:bg-green-50'
                 }`}
                 onClick={() => {
                   setActiveSection(item);
                   setIsMenuOpen(false);
                 }}
               >
                 {item.charAt(0).toUpperCase() + item.slice(1)}
               </Button>
             ))}
           </div>
         </div>
       </div>
     </nav>

     {/* Contenu principal */}
     <main className="container mx-auto px-4 py-24">
      {/* Section Accueil */}
      {activeSection === 'accueil' && (
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-800 mb-6">Bienvenue à la Ferme MOKPOKPO</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Créée en 2020 à GAOUGBLE-NYAMASSILA, notre ferme est dédiée à promouvoir l&apos;agriculture 
              et l&apos;autosuffisance alimentaire dans notre région.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Warehouse, title: "Ferme Intégrée", desc: "Production diversifiée" },
              { icon: Users, title: "Équipe Qualifiée", desc: "Experts et techniciens" },
              { icon: Tractor, title: "Équipement Moderne", desc: "Technologies agricoles" }
            ].map((item, index) => (
              <div key={index} 
                    className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="mb-6 p-3 bg-green-50 w-fit rounded-xl group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section Activités */}
      {activeSection === 'activites' && (
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-6">Nos Activités</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-64">
                <NextImage 
                  src="/images/farm-images/elevage.jpg"
                  alt="Élevage"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-green-800">Élevage</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Volailles et production d&apos;œufs</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Élevage de ruminants</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-64">
                <NextImage 
                  src="/images/farm-images/culture.jpg"
                  alt="Agriculture"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-green-800">Agriculture</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Céréales et tubercules</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Cultures fruitières</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Galerie */}
      {activeSection === 'galerie' && (
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-6">Notre Galerie</h2>
          </div>

          <div className="space-y-8">
            {/* Filtres */}
            <div className="flex justify-center gap-4 flex-wrap">
              {['Tout', 'Ferme', 'Elevage', 'Culture', 'Equipe', 'Materiel'].map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setActiveFilter(filter.toLowerCase())}
                  variant={activeFilter === filter.toLowerCase() ? 'default' : 'outline'}
                  className={`transition-colors ${
                    activeFilter === filter.toLowerCase() ? 'bg-green-700' : ''
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Grille d'images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {farmImages
                .filter(img => activeFilter === 'tout' || img.category === activeFilter)
                .map((image, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer relative h-72 rounded-2xl overflow-hidden"
                    onClick={() => setSelectedImage(image)}
                  >
                    <NextImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                        <p className="text-white text-lg font-semibold">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-green-800 mb-8">Vidéos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {farmVideos.map((video, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-lg bg-white">
                  <video controls className="w-full">
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section Ressources */}
      {activeSection === 'ressources' && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-6">Notre Équipe</h2>
          </div>

          <div className="space-y-8">
            <div 
              className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => alert('Le promoteur est le fondateur et dirigeant principal de la ferme.')}
            >
              <div className="text-center">
                <div className="inline-block p-4 rounded-full bg-green-50 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Promoteur</h3>
              </div>
            </div>

            <ChevronDown className="w-8 h-8 text-green-600 mx-auto" />

            <div 
              className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => alert('Le superviseur coordonne toutes les activités et gère les équipes.')}
            >
              <div className="text-center">
                <div className="inline-block p-4 rounded-full bg-blue-50 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Superviseur/Coordonnateur</h3>
              </div>
            </div>

            <ChevronDown className="w-8 h-8 text-green-600 mx-auto" />

            <div 
              className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => alert('Les techniciens et ouvriers sont responsables de l\'exécution des tâches quotidiennes.')}
            >
              <div className="text-center">
                <div className="inline-block p-4 rounded-full bg-gray-50 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Techniciens/Ouvriers</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Documents */}
        {activeSection === 'documents' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-800 mb-6">Documents</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Présentation de la Ferme",
                  desc: "Document complet sur la ferme",
                  filename: "ferme_mokpokpo.pdf"
                },
                {
                  title: "Ressources Humaines",
                  desc: "Devoirs et responsabilités",
                  filename: "ressources_humaines.pdf"
                }
              ].map((doc, index) => (
                <div key={index} className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="p-4 rounded-full bg-blue-50 group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{doc.title}</h3>
                        <p className="text-gray-600">{doc.desc}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleDownload(doc.filename)}
                      className="bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

     {/* Footer modernisé */}
     <footer className="relative bg-gradient-to-b from-green-800 to-green-900 text-white mt-12 overflow-hidden">
      {/* Motif décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20"></div>
      </div>

      {/* Logo et information principale */}
      <div className="relative container mx-auto px-4 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Logo section */}
          <div className="flex flex-col items-center mb-16">
            <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl rotate-45 overflow-hidden shadow-lg mb-6">
              <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                <span className="text-white text-2xl font-bold">FM</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-wider">FERME MOKPOKPO</h2>
            <p className="text-green-300 mt-2">Une ferme intégrée pour l&apos;autosuffisance alimentaire</p>
          </div>

          {/* Grid sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16">
            {/* Contact */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-green-300">Contact</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: "GAOUGBLE-NYAMASSILA, COMMUNE EST-MON3" },
                  { icon: Phone, text: "+228 00 00 00 00" },
                  { icon: Mail, text: "contact@fermemokpokpo.com" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 group cursor-pointer">
                    <div className="p-2 bg-white/10 rounded-full group-hover:bg-green-600 transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="group-hover:text-green-300 transition-colors">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activités */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-green-300">Nos Activités</h3>
              <ul className="space-y-3">
                {["Élevage", "Agriculture", "Production d'œufs"].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 group cursor-pointer">
                    <div className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors"></div>
                    <span className="group-hover:text-green-300 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectifs */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-green-300">Nos Objectifs</h3>
              <ul className="space-y-3">
                {[
                  "Promotion de l'agriculture",
                  "Autosuffisance alimentaire",
                  "Formation agricole"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 group cursor-pointer">
                    <div className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors"></div>
                    <span className="group-hover:text-green-300 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ferme MOKPOKPO. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-green-300 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-green-300 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-green-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
      </footer>

     {/* Modal d'image amélioré */}
     {selectedImage && (
       <div 
         className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 p-4"
         onClick={() => setSelectedImage(null)}
       >
         <div className="absolute top-4 right-4">
           <button
             onClick={() => setSelectedImage(null)}
             className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
           >
             <X className="w-6 h-6 text-white" />
           </button>
         </div>
         <div className="h-full flex items-center justify-center">
           <div className="relative max-w-6xl w-full">
             <NextImage
               src={selectedImage.src}
               alt={selectedImage.alt}
               width={1200}
               height={800}
               className="rounded-lg shadow-2xl"
             />
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default FarmWebsite;
