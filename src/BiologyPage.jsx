import { useState, useEffect, createContext, useContext } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  Container, Badge, Text, Group, Paper, Progress,
  Accordion, Checkbox, Collapse,
  Alert, Box, Stack,
} from "@mantine/core";
import { Button, TextArea, Spinner } from "@heroui/react";
import LoginButton from "./LoginButton.jsx";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useAttemptTracker } from "./useAttemptTracker.js";
import { syncToCloud } from "./stateSync.js";

function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  syncToCloud(key, value);
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST DATA
// ─────────────────────────────────────────────────────────────────────────────
const CHECKLIST_SECTIONS = [
  {
    id: "a41-evolution",
    title: "A4.1 – Evolution and Speciation",
    color: "#34D399",
    items: [
      "Define evolution as cumulative change in heritable characteristics of a population over time",
      "Define heritable characteristics as traits passed from parent to offspring via genes",
      "List examples of heritable characteristics (e.g. eye colour, blood type, height, disease resistance)",
      "Explain that closely related species share more similar DNA/RNA base sequences",
      "Explain that closely related species share more similar amino acid sequences in proteins",
      "Understand that the more differences in sequence, the more distantly related two species are",
      "Understand that universal genetic code suggests common ancestry",
      "Define selective breeding (artificial selection) as humans choosing organisms with desired traits to breed",
      "Give an example of selective breeding in animals (e.g. dog breeds from wolves)",
      "Give an example of selective breeding in crop plants (e.g. maize/corn varieties)",
      "Explain how selective breeding demonstrates that heritable traits can change over generations",
      "Define homologous structures as structures with the same underlying anatomy derived from a common ancestor but adapted to different functions",
      "Give examples: pentadactyl limb in humans (grasping), whales (swimming), birds (flying), horses (running)",
      "Explain how homologous structures support evolution by showing divergence from a common ancestor",
      "Define analogous structures as structures that perform the same function but have different evolutionary origins",
      "Define convergent evolution as the independent evolution of similar traits in unrelated species due to similar selection pressures",
      "Give examples: wings of insects, birds, and bats are analogous",
      "Explain why analogous structures do NOT indicate common ancestry",
      "Define speciation as the formation of new species from pre-existing species",
      "Outline that speciation occurs when populations become reproductively isolated and undergo differential selection",
      "Understand the role of natural selection in driving populations to diverge",
      "Define reproductive isolation as the inability of two populations to interbreed and produce fertile offspring",
      "Define differential selection as different selection pressures acting on separated populations",
      "Explain how reproductive isolation + differential selection leads to speciation",
      "Describe the bonobo/chimpanzee example: Congo River acted as a geographic barrier, separating populations that underwent differential selection",
      "(AHL) Define allopatric speciation: speciation caused by a geographic barrier separating populations",
      "(AHL) Describe the process: geographic barrier → reproductive isolation → differential selection → new species",
      "(AHL) Define sympatric speciation: speciation within the same geographic area, without a physical barrier",
      "(AHL) Explain that sympatric speciation occurs through genetic changes (e.g. polyploidy) within the same population",
      "(AHL) Compare: allopatric requires physical separation; sympatric does not",
      "(AHL) Define adaptive radiation as the rapid diversification of a single ancestral species into many new species to fill different ecological niches",
      "(AHL) Give the example of Darwin's finches: single common ancestor, diverged into species with different beak shapes",
      "(AHL) Explain how adaptive radiation is a major source of biodiversity",
      "(AHL) Define hybridization as the interbreeding of individuals from two different species",
      "(AHL) Explain that hybrids are often sterile due to mismatched chromosome numbers preventing normal meiosis",
      "(AHL) Use the mule example: horse (2n=64) × donkey (2n=62) = mule (2n=63, sterile — cannot pair chromosomes in meiosis)",
      "(AHL) Explain how sterility of hybrids prevents gene flow between species, maintaining species boundaries",
      "(AHL) Define polyploidy as having more than two complete sets of chromosomes",
      "(AHL) Distinguish: haploid (n), diploid (2n), polyploid (3n, 4n, etc.)",
      "(AHL) Explain how polyploidy can cause abrupt speciation: polyploid individuals cannot breed with diploid parents → instantly reproductively isolated",
      "(AHL) Define allotetraploid as an organism formed from hybridization of two species followed by chromosome doubling",
      "(AHL) Describe the process: Species A × Species B → sterile hybrid → chromosome doubling → allotetraploid (fertile, new species)",
      "(AHL) State that polyploidy is common in plants (e.g. bread wheat is hexaploid)",
    ],
  },
  {
    id: "d41-natural-selection",
    title: "D4.1 – Natural Selection",
    color: "#38BDF8",
    items: [
      "Define natural selection as the process by which organisms with favorable heritable traits survive and reproduce more successfully",
      "State the VACONSIE factors: Variation, Adaptation, Competition, Overproduction, Natural selection, Selection pressure, Inheritance, Evolution",
      "Describe Lamarckism (inheritance of acquired characteristics) and explain why it was rejected",
      "Contrast Lamarckism with Darwinian natural selection (variation exists first; environment selects; traits not acquired then inherited)",
      "Define mutation as a random, heritable change in DNA base sequence",
      "List types of mutation: substitution, deletion, insertion, inversion, translocation",
      "Explain how mutation introduces new alleles into a population",
      "Explain how sexual reproduction (meiosis + random fertilization) generates new combinations of alleles, increasing variation",
      "Explain how increased variation provides more material for natural selection to act upon",
      "Explain that most organisms produce more offspring than can survive (overproduction)",
      "Explain that resources (food, shelter, mates) are limited",
      "Explain that overproduction + limited resources = competition",
      "Explain that competition means not all individuals survive → selection occurs",
      "Name the 5 major abiotic selection pressures: water availability, mineral/nutrient availability, soil composition, light intensity, temperature",
      "Explain how abiotic factors act as selection pressures by favouring individuals better adapted to those conditions",
      "Explain that individuals within a population vary in how well adapted they are",
      "Explain that better-adapted individuals survive longer and reproduce more",
      "Explain that better-adapted individuals pass on more of their alleles to the next generation",
      "Understand this as 'differential reproductive success'",
      "Explain that only heritable traits can be passed to offspring",
      "Explain that non-heritable changes (e.g. a scar) cannot be selected for",
      "Explain that evolution requires advantageous traits to be encoded in DNA so they can be inherited",
      "Define sexual selection as a type of natural selection where individuals are chosen as mates based on certain traits",
      "Distinguish intrasexual selection (competition between same sex, e.g. antler fighting) from intersexual selection (mate choice, e.g. peacock tail)",
      "Explain how sexual selection can drive evolution of traits that may reduce survival but increase reproductive success",
      "Describe the guppy experiment: guppies in high-predation environments evolved dull colouration; in low-predation environments evolved brighter colouration",
      "Explain how this experiment controls selection pressures to isolate natural vs sexual selection",
      "Understand that this is a real-world model demonstrating selection pressures directly drive allele frequency change",
      "(AHL) Define gene pool as the complete set of all alleles present in a population at a given time",
      "(AHL) Understand that allele frequencies within the gene pool can change over time",
      "(AHL) Explain that geographically isolated populations are exposed to different selection pressures",
      "(AHL) Explain that different selection pressures cause allele frequencies to diverge between populations",
      "(AHL) Use the SLC45A2 skin pigmentation gene example: lighter pigmentation allele more frequent in Northern Europe due to selection for vitamin D synthesis",
      "(AHL) Explain that natural selection increases the frequency of advantageous alleles in the gene pool over generations",
      "(AHL) Explain that natural selection decreases the frequency of disadvantageous alleles over generations",
      "(AHL) Understand evolution at the population level as a shift in allele frequencies",
      "(AHL) Define and describe directional selection: favours one extreme phenotype; distribution shifts (e.g. antibiotic resistance)",
      "(AHL) Define and describe disruptive selection: favours both extreme phenotypes; distribution becomes bimodal (e.g. beak size in finches)",
      "(AHL) Define and describe stabilising selection: favours intermediate phenotype; distribution narrows (e.g. human birth weight)",
      "(AHL) State the two Hardy-Weinberg equations: p + q = 1 and p² + 2pq + q² = 1",
      "(AHL) Define: p = frequency of dominant allele; q = frequency of recessive allele",
      "(AHL) Define: p² = homozygous dominant; 2pq = heterozygous; q² = homozygous recessive",
      "(AHL) Use the equations to calculate allele frequencies from genotype frequencies and vice versa",
      "(AHL) List conditions for Hardy-Weinberg equilibrium: large population size, random mating, no mutation, no migration, no natural selection",
      "(AHL) Explain that if any condition is violated, allele frequencies will change (evolution occurs)",
      "(AHL) Define artificial selection as selective breeding directed by humans to enhance desired traits",
      "(AHL) Give the example of dog breeds from the gray wolf ancestor",
      "(AHL) Explain how artificial selection provides evidence for evolution (demonstrates heritable change in populations)",
    ],
  },
  {
    id: "a31-diversity",
    title: "A3.1 – Diversity of Organisms",
    color: "#FB923C",
    items: [
      "Explain that no two organisms are identical (except identical twins/clones)",
      "State that variation exists at genetic, phenotypic, and species levels",
      "Explain variation arises from mutation, sexual reproduction, and environmental factors",
      "Define a species as a group of organisms with shared morphological, physiological, and genetic traits",
      "Understand that members of a species can interbreed and produce fertile offspring",
      "Explain the binomial system: Genus + species (e.g. Homo sapiens)",
      "State conventions: Genus capitalized, species lowercase, both italicised (or underlined)",
      "Explain why a universal naming system is needed (avoids confusion from common names)",
      "Define the biological species concept: organisms that can interbreed and produce fertile offspring, reproductively isolated from other groups",
      "State limitations: does not apply to asexual organisms, fossils, or populations that rarely meet",
      "Explain that speciation is a gradual process — populations may be intermediate between same/different species",
      "Describe ring species: adjacent populations can interbreed, but the two end populations cannot",
      "Explain how ring species challenge the species concept",
      "State that chromosome numbers vary widely between species (e.g. humans 2n=46, dogs 2n=78)",
      "State that chromosome number is not related to complexity",
      "Explain that chromosome number can change via polyploidy (especially in plants)",
      "Define karyotyping as the process of photographing and arranging chromosomes by size and shape",
      "Define a karyogram as the organised image of chromosomes in homologous pairs",
      "State uses of karyotyping: detecting chromosomal abnormalities (e.g. Down syndrome = trisomy 21), determining sex",
      "Explain that all members of a species share the same genes (same loci) but may have different alleles",
      "Explain that genome differences within a species arise from mutation and recombination",
      "Understand that ~99.9% of the human genome is identical between individuals",
      "State that eukaryotic genomes vary greatly in size and complexity",
      "Explain that genome size (C-value) does not correlate with organism complexity (C-value paradox)",
      "Explain that much eukaryotic DNA is non-coding (introns, repetitive sequences)",
      "State that bacteria have small genomes (~1–10 Mb); eukaryotes generally larger",
      "Note that some plants and amphibians have far larger genomes than humans",
      "Give approximate human genome size: ~3,200 Mb (3.2 Gb)",
      "Explain that larger genome size does not mean more genes",
      "Current uses of WGS: diagnosing genetic diseases, pharmacogenomics, identifying pathogens, forensics, evolutionary studies",
      "Future uses of WGS: predicting disease risk, gene therapy targets, understanding gene regulation",
      "(AHL) Explain that bacteria reproduce asexually (binary fission), so the interbreeding criterion does not apply",
      "(AHL) Define horizontal gene transfer (HGT): transfer of genes between organisms other than parent-to-offspring",
      "(AHL) Explain that HGT means bacterial 'species' can exchange genes freely, making species boundaries meaningless",
      "(AHL) State that chromosome number is generally consistent within a species",
      "(AHL) Explain that chromosome number must match for proper homologous pairing in meiosis",
      "(AHL) Note exceptions: polyploidy can create new species with different chromosome numbers",
      "(AHL) Define a dichotomous key as a tool for identifying organisms using a series of yes/no questions about observable traits",
      "(AHL) Explain how to construct a dichotomous key: start with the broadest distinguishing feature, branch into two options at each step",
      "(AHL) Define eDNA as DNA collected from environmental samples (water, soil, air) rather than directly from organisms",
      "(AHL) Explain that DNA barcodes are short, standardised gene sequences (e.g. COI gene) unique to each species",
      "(AHL) Explain the eDNA process: collect sample → extract DNA → PCR amplify barcode region → sequence → compare to reference database",
      "(AHL) State advantages of eDNA barcoding: non-invasive, can detect rare or cryptic species",
    ],
  },
  {
    id: "a32-classification",
    title: "A3.2 – Classification and Cladistics (AHL)",
    color: "#A78BFA",
    items: [
      "State reasons for classification: organisation of knowledge, communication, prediction of shared traits, conservation prioritisation, pharmacology",
      "List traditional taxa in order: Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species",
      "Mnemonic: 'Dear King Philip Came Over For Good Soup'",
      "State difficulties with traditional taxonomy: based on morphology which can be misleading (convergent evolution), arbitrary boundaries, doesn't reflect evolutionary history",
      "Explain that classification based on evolutionary relationships (phylogeny) is more informative and stable",
      "State that shared evolutionary origin predicts shared biochemistry, physiology, and genetics",
      "Explain that phylogenetic classification can be tested and revised with new molecular data",
      "Define a clade as a group consisting of a common ancestor and ALL of its descendants",
      "Explain that a valid clade must be monophyletic (includes ancestor + all descendants)",
      "Distinguish from paraphyletic (excludes some descendants) and polyphyletic (no single common ancestor) groups — these are NOT clades",
      "Explain that DNA/protein sequences accumulate mutations at a roughly constant rate over time",
      "Explain that the more sequence differences between two species, the longer ago they shared a common ancestor",
      "Define the molecular clock: the use of mutation rate to estimate time of divergence between species",
      "Understand the graph: nucleotide substitutions increase linearly with time since divergence",
      "Explain that cladograms are constructed by comparing DNA base sequences or amino acid sequences",
      "State that species with fewer differences are placed closer together on the cladogram",
      "Understand that shared derived characters (synapomorphies) are used to group species into clades",
      "Know how to fill in a character table and use it to place species in a cladogram",
      "Define the root: the common ancestor of all species on the cladogram",
      "Define a node: a branching point representing a common ancestor of the groups that branch from it",
      "Define a terminal branch: the tip of the cladogram representing an extant (living) species or group",
      "Determine most closely related species: those that share the most recent common node",
      "Determine most distantly related: those that diverge at the earliest (deepest) node",
      "Explain that molecular cladistics has led to reclassification of many organisms",
      "Give an example: cladistics confirms birds are a clade within dinosaurs (Archosauria)",
      "Understand that traditional taxonomy can be paraphyletic (e.g. 'reptiles' excluding birds is not a true clade)",
      "State that all life is classified into three domains: Bacteria, Archaea, Eukarya",
      "State the evidence used: rRNA base sequences (16S rRNA for prokaryotes)",
      "Explain that Archaea are more closely related to Eukarya than to Bacteria based on rRNA",
      "State that this replaced the old five-kingdom system",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARD DATA
// ─────────────────────────────────────────────────────────────────────────────
const FLASHCARD_CATEGORIES = [
  {
    id: "evolution-speciation",
    label: "A4.1 Evolution & Speciation",
    color: "#34D399",
    cards: [
      { term: "Evolution", def: "The cumulative change in the heritable characteristics of a population over successive generations." },
      { term: "Heritable characteristics", def: "Traits encoded in an organism's DNA that can be passed from parent to offspring." },
      { term: "DNA/RNA evidence for evolution", def: "Species that share more similar DNA or RNA sequences are more closely related and share a more recent common ancestor. The degree of sequence similarity reflects evolutionary relatedness." },
      { term: "Selective breeding as evidence for evolution", def: "Selective breeding (artificial selection) is when humans choose organisms with desired traits to reproduce. It shows that heritable characteristics can change substantially over generations under selection pressure — demonstrating the core mechanism of evolution." },
      { term: "Homologous structures", def: "Structures in different species that have the same underlying anatomy and common evolutionary origin, but have been modified to perform different functions (e.g. the pentadactyl limb in humans, whales, horses, bats)." },
      { term: "Homologous structures as evidence for evolution", def: "They indicate descent from a common ancestor. The same basic structural plan, modified by natural selection for different functions, suggests species diverged from a shared ancestor." },
      { term: "Analogous structures", def: "Structures in different species that perform the same function but have different evolutionary origins (e.g. wings of insects vs. birds vs. bats)." },
      { term: "Convergent evolution", def: "The independent evolution of similar traits in unrelated species, driven by similar selection pressures. It produces analogous structures." },
      { term: "Speciation", def: "The process by which one species splits into two or more new species, typically through reproductive isolation followed by differential selection." },
      { term: "Reproductive isolation", def: "The inability of two populations to successfully interbreed and produce fertile offspring, preventing gene flow between them." },
      { term: "Differential selection", def: "Different selection pressures acting on separated populations, causing them to evolve in different directions." },
      { term: "Bonobo/chimpanzee speciation example", def: "The Congo River formed a geographic barrier separating an ancestral population. The two isolated populations — north (chimpanzees) and south (bonobos) — experienced different environments and social structures, underwent differential selection, and eventually became reproductively isolated as separate species." },
      { term: "Allopatric speciation (AHL)", def: "Speciation that occurs when populations are physically separated by a geographic barrier. The isolated populations diverge through differential selection and genetic drift until they can no longer interbreed." },
      { term: "Sympatric speciation (AHL)", def: "Speciation that occurs within the same geographic area without physical separation, typically through genetic mechanisms such as polyploidy or ecological specialisation." },
      { term: "Adaptive radiation (AHL)", def: "The rapid diversification of a single ancestral species into many new species to exploit different ecological niches. Example: Darwin's finches diversifying from one ancestor into many species with different beak types." },
      { term: "Hybridisation and hybrid sterility (AHL)", def: "Hybridisation is the interbreeding of two different species. Hybrids are often sterile because the two parent species have different chromosome numbers, so homologous chromosomes cannot pair properly during meiosis (e.g. mule: horse 2n=64, donkey 2n=62 → mule 2n=63, sterile)." },
      { term: "Polyploidy (AHL)", def: "The condition of having more than two complete sets of chromosomes (e.g. triploid = 3n, tetraploid = 4n)." },
      { term: "Polyploidy and abrupt speciation (AHL)", def: "A polyploid individual (e.g. tetraploid) cannot successfully interbreed with diploid parents because chromosome numbers don't match for meiosis. The polyploid is instantly reproductively isolated and becomes a new species." },
      { term: "Allotetraploid (AHL)", def: "An organism formed when two different species hybridise and the resulting hybrid undergoes chromosome doubling. It contains four full sets of chromosomes (two from each parent species) and is fertile because it can now pair chromosomes in meiosis." },
    ],
  },
  {
    id: "natural-selection",
    label: "D4.1 Natural Selection",
    color: "#38BDF8",
    cards: [
      { term: "Natural selection", def: "The process by which organisms with heritable traits better suited to their environment survive longer and reproduce more, passing those traits to more offspring — leading to those traits increasing in frequency over generations." },
      { term: "VACONSIE", def: "Variation, Adaptation, Competition, Overproduction, Natural Selection, Selection pressure, Inheritance, Evolution — the key factors in evolution by natural selection." },
      { term: "Lamarckism and why it was rejected", def: "Lamarckism proposed that organisms develop traits during their lifetime in response to use/disuse, and pass these acquired traits to offspring. It was rejected because acquired characteristics are not encoded in DNA and cannot be inherited (e.g. a giraffe stretching its neck doesn't give offspring longer necks)." },
      { term: "Mutation as a source of variation", def: "Mutations are random changes in DNA base sequence that can produce new alleles. If the new allele affects the phenotype, it may be advantageous, neutral, or disadvantageous — providing raw material for natural selection." },
      { term: "Sexual reproduction as a source of variation", def: "Through independent assortment and crossing over during meiosis, and random fertilisation, sexual reproduction produces offspring with unique combinations of alleles, greatly increasing phenotypic variation in a population." },
      { term: "Overproduction and competition", def: "Most species produce far more offspring than the environment can support. Limited resources create competition. Not all individuals survive to reproduce — those with advantageous traits are more likely to survive and pass on their traits." },
      { term: "Five abiotic selection pressures", def: "Water availability, mineral/nutrient availability, soil composition, light intensity, temperature." },
      { term: "Why must traits be heritable for evolution?", def: "Evolution requires that advantageous traits are passed to offspring. If a beneficial trait is not encoded in DNA (e.g. a learned skill or acquired injury), it cannot be inherited and cannot increase in frequency in the population." },
      { term: "Sexual selection", def: "A form of natural selection where individuals are chosen as mates based on certain traits. This can favour traits that enhance reproductive success (e.g. peacock tails) even if they reduce survival, because reproductive success contributes to allele frequency change." },
      { term: "Guppy experiment (Endler)", def: "Guppies from high-predation environments evolved dull colouration (camouflage selected for). When moved to low-predation environments, they evolved brighter colouration over 15 generations (sexual selection became dominant). This controlled experiment showed selection pressures directly drive phenotypic change." },
      { term: "Gene pool (AHL)", def: "The total collection of all alleles present in all individuals in a population at a given time." },
      { term: "Directional selection (AHL)", def: "Selection that favours one extreme phenotype over the average and the other extreme. The frequency distribution shifts toward the favoured extreme over time (e.g. bacteria evolving antibiotic resistance)." },
      { term: "Disruptive selection (AHL)", def: "Selection that favours both extreme phenotypes while selecting against the intermediate. The frequency distribution becomes bimodal, and can eventually lead to speciation." },
      { term: "Stabilising selection (AHL)", def: "Selection that favours the intermediate phenotype and selects against both extremes. The distribution narrows but does not shift (e.g. human birth weight — too high or too low increases mortality risk)." },
      { term: "Hardy-Weinberg equations (AHL)", def: "p + q = 1 (allele frequencies) and p² + 2pq + q² = 1 (genotype frequencies), where p = frequency of dominant allele, q = frequency of recessive allele, p² = homozygous dominant, 2pq = heterozygous, q² = homozygous recessive." },
      { term: "Hardy-Weinberg equilibrium conditions (AHL)", def: "1) Large population size, 2) Random mating, 3) No mutation, 4) No migration (no gene flow), 5) No natural selection. If all five are met, allele frequencies do not change — the population is not evolving." },
      { term: "Artificial selection (AHL)", def: "The deliberate selection by humans of organisms with desired traits for breeding, to enhance those traits over generations. It provides evidence for evolution by demonstrating that populations can change substantially under directed selection." },
    ],
  },
  {
    id: "diversity",
    label: "A3.1 Diversity of Organisms",
    color: "#FB923C",
    cards: [
      { term: "Variation as a defining feature of life", def: "All organisms show differences in structure, physiology, and genetics. Variation arises from mutation, sexual reproduction, and environmental influences, and is essential for natural selection and evolution to occur." },
      { term: "Biological species concept", def: "A group of organisms that can interbreed with one another and produce fertile offspring, and that are reproductively isolated from other such groups." },
      { term: "Binomial naming system", def: "Each species is given a two-part Latin name: Genus (capitalised) + species (lowercase), both italicised. E.g. Homo sapiens. Standardises naming globally." },
      { term: "Limitations of biological species concept", def: "It cannot be applied to: asexual organisms (e.g. bacteria), fossils (cannot test interbreeding), ring species (ambiguous), or geographically isolated populations that could interbreed but never meet." },
      { term: "Ring species", def: "A series of populations distributed around a geographic barrier where adjacent populations can interbreed, but the two end populations cannot. It shows speciation as a continuum, challenging the idea that species are discrete units." },
      { term: "Karyotyping", def: "The process of isolating, staining, photographing, and arranging chromosomes by size and banding pattern to produce a karyogram. Uses include detecting chromosomal abnormalities (e.g. Down syndrome = trisomy 21) and determining biological sex." },
      { term: "C-value paradox", def: "The observation that genome size (C-value) does not correlate with the complexity of the organism. For example, some lilies and amphibians have genomes far larger than humans, despite being less complex organisms." },
      { term: "Uses of whole genome sequencing", def: "Current: diagnosing genetic diseases, personalised medicine, identifying pathogens (e.g. COVID-19 variants), forensic identification, evolutionary research. Future: predicting disease susceptibility, targeting gene therapy, understanding gene regulation." },
      { term: "Biological species concept and bacteria (AHL)", def: "Bacteria reproduce asexually, so the interbreeding criterion is irrelevant. Additionally, horizontal gene transfer (HGT) allows genes to move between unrelated bacterial lineages, making species boundaries blurry." },
      { term: "Horizontal gene transfer (AHL)", def: "The transfer of genetic material between organisms other than from parent to offspring. In bacteria, this occurs via plasmids (conjugation), transformation (uptake of free DNA), and transduction (via bacteriophages). It blurs species distinctions and accelerates evolution." },
      { term: "Dichotomous key (AHL)", def: "A tool for identifying organisms using a branching series of paired, mutually exclusive questions based on observable characteristics. At each step, you choose one of two options, leading to the next question or a final identification." },
      { term: "eDNA barcoding (AHL)", def: "Environmental DNA (eDNA) is collected from environmental samples. Short standardised gene sequences (barcodes, e.g. the COI gene) are amplified by PCR and sequenced. The sequence is compared to a reference database to identify species present. Used for biodiversity surveys without capturing organisms." },
    ],
  },
  {
    id: "classification",
    label: "A3.2 Classification & Cladistics",
    color: "#A78BFA",
    cards: [
      { term: "Why classify organisms?", def: "To organise biodiversity, enable communication about species, predict shared traits (e.g. drug reactions), identify conservation priorities, and understand evolutionary relationships." },
      { term: "Eight traditional taxonomic levels", def: "Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species. Mnemonic: 'Dear King Philip Came Over For Good Soup'" },
      { term: "Difficulties with traditional taxonomy", def: "Based on morphology, which can be misleading (convergent evolution can make unrelated organisms look similar). Does not necessarily reflect evolutionary history. Boundaries between groups can be arbitrary." },
      { term: "Clade", def: "A group consisting of a single common ancestor and ALL of its descendants. A valid clade is monophyletic — it includes the ancestor and every lineage that descended from it, with no exclusions." },
      { term: "Molecular clock", def: "The concept that mutations accumulate in DNA at a roughly constant rate. By comparing the number of sequence differences between species, scientists can estimate how long ago they shared a common ancestor." },
      { term: "Cladogram", def: "A branching diagram that shows the hypothetical evolutionary relationships among a group of species, based on shared derived characteristics (morphological or molecular data)." },
      { term: "Node on a cladogram", def: "A branching point representing a hypothetical common ancestor from which two or more lineages diverged." },
      { term: "Root of a cladogram", def: "The base of the cladogram representing the oldest common ancestor of all the species shown." },
      { term: "Identifying closest relatives on a cladogram", def: "Find the two species that share the most recent (most terminal) common node. The more recently two lineages diverged, the more closely related they are." },
      { term: "Evidence for three-domain classification", def: "Comparisons of ribosomal RNA (rRNA) base sequences — specifically 16S rRNA in prokaryotes and 18S rRNA in eukaryotes. This showed that Archaea and Eukarya are more closely related to each other than either is to Bacteria." },
      { term: "Three domains", def: "Bacteria (prokaryotes, no nucleus, unique cell wall chemistry), Archaea (prokaryotes, no nucleus, different membrane lipids and rRNA from bacteria), Eukarya (eukaryotes, membrane-bound nucleus, includes all plants, animals, fungi, and protists)." },
      { term: "Caution about cladograms", def: "Cladograms are hypotheses based on available data. Different genes can give conflicting trees. Horizontal gene transfer, convergent evolution at the molecular level, and incomplete sequence data can all affect accuracy. They should be treated as the best current hypothesis, not absolute fact." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MCQ DATA
// ─────────────────────────────────────────────────────────────────────────────
const MCQ_QUESTIONS = [
  // A4.1 – Evolution and Speciation
  { id: "bio_mcq_01", cat: "Evolution & Speciation", difficulty: "SL", q: "Which statement best defines evolution?", options: ["A physical change in an individual organism during its lifetime", "A cumulative change in the heritable characteristics of a population over generations", "A measure of the survival rate of individuals in a population", "A random change in allele proportions due to chance events"], answer: 1, explanation: "Evolution is specifically defined as the cumulative change in heritable characteristics across generations in a population, not a change in any individual." },
  { id: "bio_mcq_02", cat: "Evolution & Speciation", difficulty: "SL", q: "Which type of evidence for evolution involves comparing the similarities in bone structure among vertebrate limbs?", options: ["Analogous structures", "Selective breeding evidence", "Homologous structures", "DNA sequence comparison"], answer: 2, explanation: "Homologous structures are structures with the same underlying anatomy derived from a common ancestor, adapted to different functions." },
  { id: "bio_mcq_03", cat: "Evolution & Speciation", difficulty: "SL", q: "The wing of a bat and the wing of a butterfly are described as analogous structures. This means they:", options: ["Have identical bone structure", "Evolved from a common ancestor", "Perform the same function but have different evolutionary origins", "Are evidence of divergent evolution"], answer: 2, explanation: "Analogous structures perform the same function (flight) but evolved independently in different lineages with no common structural ancestry." },
  { id: "bio_mcq_04", cat: "Evolution & Speciation", difficulty: "SL", q: "In the context of speciation, what is differential selection?", options: ["Selection that favours intermediate phenotypes", "The same selection pressures acting on both populations", "Different selection pressures acting on geographically separated populations", "Human-directed selection for specific traits"], answer: 2, explanation: "Differential selection means different environments exert different selective pressures on separated populations, driving them to diverge." },
  { id: "bio_mcq_05", cat: "Evolution & Speciation", difficulty: "SL", q: "Mules (horse × donkey hybrids) are sterile because:", options: ["Mules have identical chromosomes to horses", "Their chromosome number (2n=63) means chromosomes cannot pair correctly during meiosis", "Hybridisation always produces non-viable offspring", "Donkeys and horses belong to entirely different genera"], answer: 1, explanation: "The odd number of chromosomes (63) means chromosomes cannot form homologous pairs during meiosis, so gamete formation fails." },
  { id: "bio_mcq_06", cat: "Evolution & Speciation", difficulty: "AHL", q: "Adaptive radiation is best described as:", options: ["The gradual divergence of one species into two species through geographic isolation", "The rapid diversification of one ancestral species into many species filling different ecological niches", "The convergent evolution of similar traits in unrelated species", "The extinction of ancestral species after new species appear"], answer: 1, explanation: "Adaptive radiation is the rapid diversification from one ancestor into many species, each adapted to a different niche — as seen in Darwin's finches." },
  { id: "bio_mcq_07", cat: "Evolution & Speciation", difficulty: "AHL", q: "Which of the following is an example of allopatric speciation?", options: ["Polyploidy producing a new plant species within the same field", "Two guppy populations in the same river evolving different colour patterns", "A mountain range separating a rodent population into two groups that diverge over time", "A new allele arising by mutation and spreading through a population"], answer: 2, explanation: "Allopatric speciation requires a geographic barrier physically separating populations — a mountain range is a classic example." },
  { id: "bio_mcq_08", cat: "Evolution & Speciation", difficulty: "AHL", q: "An allotetraploid is formed when:", options: ["A diploid organism undergoes a spontaneous doubling of chromosomes", "Two different species hybridise and the hybrid undergoes chromosome doubling", "An organism loses half its chromosomes during faulty meiosis", "Two populations of the same species merge and interbreed"], answer: 1, explanation: "Allotetraploids form from interspecific hybridization followed by chromosome doubling, giving 4 sets of chromosomes total." },
  { id: "bio_mcq_09", cat: "Evolution & Speciation", difficulty: "SL", q: "Which provides the most direct molecular evidence for common ancestry between two species?", options: ["They live in the same geographic region", "They have similar body shapes", "Their ribosomal RNA sequences are nearly identical", "They have the same number of chromosomes"], answer: 2, explanation: "Similar rRNA sequences indicate shared evolutionary origin and common ancestry at the molecular level — a direct genetic link." },
  { id: "bio_mcq_10", cat: "Evolution & Speciation", difficulty: "SL", q: "Darwin's finches on the Galapagos Islands are an example of:", options: ["Convergent evolution", "Stabilising selection", "Adaptive radiation", "Sympatric speciation via polyploidy"], answer: 2, explanation: "Darwin's finches diversified from one common ancestor into many species with different beak types to fill different niches — classic adaptive radiation." },
  // D4.1 – Natural Selection
  { id: "bio_mcq_11", cat: "Natural Selection", difficulty: "SL", q: "What is the correct order of events in evolution by natural selection?", options: ["Selection → Variation → Inheritance → Overproduction", "Overproduction → Competition → Variation → Inheritance", "Variation → Overproduction → Competition → Differential survival → Inheritance of favourable traits", "Mutation → Selection → Overproduction → Competition"], answer: 2, explanation: "Variation must exist first, then overproduction creates competition, differential survival occurs, and advantageous traits are inherited." },
  { id: "bio_mcq_12", cat: "Natural Selection", difficulty: "SL", q: "Lamarckism differs from Darwinian natural selection in that Lamarckism proposes:", options: ["Variation within a population drives selection", "Traits acquired through use during an organism's life are inherited by offspring", "Mutations are the source of variation", "Organisms with the best adaptations survive to reproduce"], answer: 1, explanation: "Lamarckism proposed inheritance of acquired characteristics, which was rejected because acquired traits are not encoded in DNA." },
  { id: "bio_mcq_13", cat: "Natural Selection", difficulty: "SL", q: "Which of the following is NOT a source of heritable variation in a population?", options: ["Gene mutation", "Independent assortment during meiosis", "Crossing over during prophase I", "A scar acquired from an injury"], answer: 3, explanation: "Scars are not encoded in DNA and cannot be inherited — they are non-heritable, acquired changes and therefore cannot be acted on by natural selection." },
  { id: "bio_mcq_14", cat: "Natural Selection", difficulty: "SL", q: "Which abiotic factor is most likely to select for pale colouration in a desert lizard?", options: ["Soil mineral content", "High temperatures and bright light", "Water availability", "Soil composition favouring burrowing"], answer: 1, explanation: "Bright light and high temperatures in deserts favour pale colouration for camouflage against pale sandy substrates and for heat reflection." },
  { id: "bio_mcq_15", cat: "Natural Selection", difficulty: "SL", q: "Which statement about sexual selection is correct?", options: ["It only acts on female phenotypes", "It always increases overall survival fitness", "It can favour traits that reduce survival but increase reproductive success", "It is identical to natural selection in all respects"], answer: 2, explanation: "Sexual selection can drive evolution of traits like peacock tails that may reduce survival but greatly increase mating and reproductive success." },
  { id: "bio_mcq_16", cat: "Natural Selection", difficulty: "AHL", q: "In the Hardy-Weinberg equation, what does 2pq represent?", options: ["Frequency of homozygous dominant genotype", "Frequency of homozygous recessive genotype", "Frequency of heterozygous genotype", "Total frequency of all alleles"], answer: 2, explanation: "2pq represents the heterozygous genotype frequency — individuals carrying one dominant and one recessive allele." },
  { id: "bio_mcq_17", cat: "Natural Selection", difficulty: "AHL", q: "A population of plants is studied. 16% show the recessive phenotype (wrinkled seeds). Using Hardy-Weinberg, what is the frequency of the dominant allele?", options: ["0.16", "0.40", "0.60", "0.84"], answer: 2, explanation: "q² = 0.16, so q = 0.4, and p = 1 − 0.4 = 0.6." },
  { id: "bio_mcq_18", cat: "Natural Selection", difficulty: "AHL", q: "Which type of selection leads to a bimodal distribution of phenotypes?", options: ["Stabilising selection", "Directional selection", "Disruptive selection", "Sexual selection"], answer: 2, explanation: "Disruptive selection favours both extreme phenotypes over the intermediate, producing a bimodal distribution and potentially driving speciation." },
  { id: "bio_mcq_19", cat: "Natural Selection", difficulty: "AHL", q: "Which condition, if violated, would most directly cause allele frequencies to change in a population?", options: ["Organisms reproducing sexually", "Natural selection occurring", "Organisms living in a warm climate", "Population having distinct sexes"], answer: 1, explanation: "Natural selection is one of the five Hardy-Weinberg conditions; if it occurs, individuals with different genotypes have different fitness and allele frequencies shift." },
  { id: "bio_mcq_20", cat: "Natural Selection", difficulty: "SL", q: "The guppy experiment by Endler demonstrated that:", options: ["Sexual selection and natural selection always act in the same direction", "Guppies cannot adapt to new environments within 15 generations", "Selection pressures directly determine the direction of phenotypic evolution", "Only female guppies are subject to selection"], answer: 2, explanation: "The experiment showed that when predation pressure changed, the direction of selection changed — demonstrating selection pressures drive the direction of evolution." },
  // A3.1 – Diversity of Organisms
  { id: "bio_mcq_21", cat: "Diversity of Organisms", difficulty: "SL", q: "Which best defines the biological species concept?", options: ["A group of organisms with identical DNA sequences", "A group of organisms with the same morphological features", "A group of organisms that can interbreed and produce fertile offspring", "A group of organisms living in the same geographic area"], answer: 2, explanation: "The biological species concept defines species by reproductive compatibility — the ability to interbreed and produce fertile offspring." },
  { id: "bio_mcq_22", cat: "Diversity of Organisms", difficulty: "SL", q: "In binomial nomenclature, which of the following is correctly written?", options: ["homo sapiens", "Homo Sapiens", "Homo sapiens", "homo Sapiens"], answer: 2, explanation: "The genus is capitalised and the species epithet is lowercase; both are italicised — Homo sapiens." },
  { id: "bio_mcq_23", cat: "Diversity of Organisms", difficulty: "SL", q: "A karyogram would be most useful for:", options: ["Determining the DNA sequence of a gene", "Identifying the number and structure of chromosomes in an organism", "Measuring the rate of mutation in a population", "Comparing amino acid sequences between species"], answer: 1, explanation: "A karyogram shows chromosomes arranged by size and banding pattern, enabling identification of chromosomal number and structural abnormalities." },
  { id: "bio_mcq_24", cat: "Diversity of Organisms", difficulty: "SL", q: "Why does genome size not correlate with organism complexity?", options: ["More complex organisms always have fewer genes", "Much of eukaryotic DNA is non-coding, and genome size reflects non-coding sequences as much as gene number", "Bacteria have more genes than eukaryotes", "Gene expression is identical in all eukaryotes"], answer: 1, explanation: "The C-value paradox arises because much eukaryotic DNA is non-coding (introns, repetitive sequences), so genome size does not equal gene number or complexity." },
  { id: "bio_mcq_25", cat: "Diversity of Organisms", difficulty: "AHL", q: "Which is a limitation of the biological species concept when applied to bacteria?", options: ["Bacteria have no DNA", "Bacteria reproduce sexually, making interbreeding impossible to assess", "Bacteria reproduce asexually, so the interbreeding criterion does not apply", "Bacterial genomes are too small to compare"], answer: 2, explanation: "Since bacteria reproduce by binary fission (asexually), the interbreeding criterion of the biological species concept is meaningless for them." },
  { id: "bio_mcq_26", cat: "Diversity of Organisms", difficulty: "AHL", q: "Environmental DNA barcoding can identify species by:", options: ["Observing organisms directly in their habitat", "Amplifying and sequencing a standardised short gene region from environmental samples", "Counting chromosomes from shed cells", "Comparing protein structures from water samples"], answer: 1, explanation: "eDNA barcoding uses PCR to amplify a standardised gene (e.g. COI) from environmental samples, then compares sequences to a reference database." },
  { id: "bio_mcq_27", cat: "Diversity of Organisms", difficulty: "SL", q: "Which statement about chromosome numbers between species is correct?", options: ["More complex organisms always have more chromosomes", "Chromosome number is highly variable and does not correlate with complexity", "All mammals have the same chromosome number", "Plants always have fewer chromosomes than animals"], answer: 1, explanation: "Chromosome number varies enormously across species and has no relationship to organismal complexity — ferns can have hundreds." },
  { id: "bio_mcq_28", cat: "Diversity of Organisms", difficulty: "SL", q: "The C-value paradox refers to:", options: ["The observation that carbon content does not relate to organism size", "The lack of correlation between genome size and organism complexity", "The finding that all organisms have the same amount of coding DNA", "The discrepancy between chromosome number and gene number"], answer: 1, explanation: "The C-value paradox is the observation that genome size does not correlate with biological complexity." },
  // A3.2 – Classification and Cladistics
  { id: "bio_mcq_29", cat: "Classification & Cladistics", difficulty: "AHL", q: "A clade is defined as:", options: ["A group of organisms sharing a similar appearance", "Any group of organisms classified within the same family", "A common ancestor and all of its descendants", "Two or more species that can interbreed"], answer: 2, explanation: "A clade (monophyletic group) must include the common ancestor plus all of its descendants, with no exclusions." },
  { id: "bio_mcq_30", cat: "Classification & Cladistics", difficulty: "AHL", q: "Which of the following groups is NOT a valid clade?", options: ["All birds", "All mammals", "Reptiles (excluding birds)", "All vertebrates"], answer: 2, explanation: "Traditional 'Reptilia' excluding birds is paraphyletic — birds are descendants of the reptile ancestor but are excluded, making it an invalid clade." },
  { id: "bio_mcq_31", cat: "Classification & Cladistics", difficulty: "AHL", q: "The molecular clock is based on the principle that:", options: ["All proteins evolve at the same rate", "DNA mutations accumulate at a roughly constant rate over time", "Larger organisms evolve more slowly", "Mitochondrial DNA mutates faster than nuclear DNA"], answer: 1, explanation: "The molecular clock uses the approximately constant rate of DNA mutation to estimate divergence times between species." },
  { id: "bio_mcq_32", cat: "Classification & Cladistics", difficulty: "AHL", q: "Which evidence led to the classification of all life into three domains?", options: ["Fossil record analysis", "Comparison of ribosomal RNA base sequences", "Morphological comparison of cell structure", "Protein electrophoresis"], answer: 1, explanation: "Comparisons of rRNA sequences (especially 16S rRNA) revealed the three-domain structure of life — Bacteria, Archaea, Eukarya." },
  { id: "bio_mcq_33", cat: "Classification & Cladistics", difficulty: "AHL", q: "On a cladogram, the most recently diverged species are:", options: ["Located at opposite ends of the cladogram", "The ones with the fewest shared characteristics", "Those that share the most recent common node", "Those that branched from the root first"], answer: 2, explanation: "Species sharing the most recent (most terminal) common node are most closely related and most recently diverged." },
  { id: "bio_mcq_34", cat: "Classification & Cladistics", difficulty: "AHL", q: "Which best explains why traditional taxonomy can be misleading?", options: ["It uses Latin names that are difficult to remember", "Convergent evolution can make unrelated species appear morphologically similar", "It classifies too many species in the same genus", "It does not consider physical characteristics at all"], answer: 1, explanation: "Convergent evolution produces similar morphology in unrelated species, causing morphology-based taxonomy to place them incorrectly together." },
  { id: "bio_mcq_35", cat: "Classification & Cladistics", difficulty: "AHL", q: "The classification of birds within the reptile clade (rather than as a separate class) is an example of:", options: ["Convergent evolution reclassifying organisms", "Cladistics correcting traditional paraphyletic taxonomy", "Horizontal gene transfer affecting classification", "Artificial selection creating new taxonomic groups"], answer: 1, explanation: "Molecular cladistics revealed birds are nested within dinosaurs (Archosauria), correcting the paraphyletic traditional 'Reptilia'." },
  { id: "bio_mcq_36", cat: "Classification & Cladistics", difficulty: "AHL", q: "The correct order of taxonomic levels from broadest to most specific is:", options: ["Species, Genus, Family, Order, Class, Phylum, Kingdom, Domain", "Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species", "Domain, Phylum, Kingdom, Class, Order, Family, Genus, Species", "Kingdom, Domain, Phylum, Class, Order, Family, Species, Genus"], answer: 1, explanation: "From broadest to most specific: Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species — 'Dear King Philip Came Over For Good Soup'." },
];

// ─────────────────────────────────────────────────────────────────────────────
// WRITTEN QUESTIONS DATA
// ─────────────────────────────────────────────────────────────────────────────
const WRITTEN_QUESTIONS = [
  { id: "bio_wr_01", cat: "Evolution & Speciation", difficulty: "SL", marks: 3, q: "Define evolution and state two examples of heritable characteristics.", modelAnswer: "Evolution is the cumulative change in the heritable characteristics of a population over successive generations. [1]\nAny two correct heritable characteristics from: eye colour / blood type / skin colour / height / disease resistance / presence of a tail / hair texture [1 each, max 2]" },
  { id: "bio_wr_02", cat: "Evolution & Speciation", difficulty: "SL", marks: 3, q: "Outline how homologous structures provide evidence for evolution by natural selection.", modelAnswer: "Homologous structures are structures with the same underlying anatomy (same bones/arrangement) found in different species. [1]\nThey indicate that species share a common ancestor. [1]\nThe structures have been modified (diverged) by natural selection to perform different functions in different environments, showing how populations change over time. [1]" },
  { id: "bio_wr_03", cat: "Evolution & Speciation", difficulty: "SL", marks: 4, q: "Explain the difference between analogous and homologous structures. Give one example of each.", modelAnswer: "Homologous structures: same underlying anatomy, different functions, common evolutionary origin. [1]\nExample: pentadactyl limb in human (grasping) and whale (swimming) / bird wing and human arm. [1]\nAnalogous structures: same function, different underlying anatomy/evolutionary origin. [1]\nExample: wing of insect and wing of bird / dolphin fin and fish fin. [1]" },
  { id: "bio_wr_04", cat: "Evolution & Speciation", difficulty: "SL", marks: 4, q: "Describe the roles of reproductive isolation and differential selection in speciation.", modelAnswer: "Reproductive isolation prevents gene flow between two populations. [1]\nWithout gene flow, the two populations evolve independently. [1]\nDifferent environments exert different selection pressures on each population (differential selection). [1]\nOver time, the populations accumulate different genetic changes and become distinct species unable to interbreed even if reunited. [1]" },
  { id: "bio_wr_05", cat: "Evolution & Speciation", difficulty: "AHL", marks: 4, q: "Compare allopatric and sympatric speciation.", modelAnswer: "Both result in the formation of new species through reproductive isolation. [1]\nAllopatric: physical/geographic barrier separates populations → isolation → divergence. [1]\nSympatric: speciation within the same geographic area, no physical barrier; occurs via genetic changes such as polyploidy or ecological specialisation. [1]\nKey difference: allopatric requires physical separation; sympatric does not. [1]" },
  { id: "bio_wr_06", cat: "Evolution & Speciation", difficulty: "AHL", marks: 4, q: "Explain how polyploidy can lead to abrupt speciation in plants.", modelAnswer: "Polyploidy = having more than two complete sets of chromosomes. [1]\nA polyploid individual cannot successfully breed with the diploid parent population because chromosome numbers don't match → chromosomes cannot pair in meiosis. [1]\nThe polyploid is therefore immediately reproductively isolated from the parent species. [1]\nThis can form a new fertile species instantly (especially allotetraploids formed by hybridisation + chromosome doubling). [1]" },
  { id: "bio_wr_07", cat: "Evolution & Speciation", difficulty: "AHL", marks: 2, q: "The mule is the offspring of a horse (2n = 64) and a donkey (2n = 62). Explain why mules are sterile.", modelAnswer: "The mule has 63 chromosomes (2n = 63), an odd number. [1]\nDuring meiosis, chromosomes cannot form homologous pairs correctly, so gamete formation fails → sterility. [1]" },
  { id: "bio_wr_08", cat: "Natural Selection", difficulty: "SL", marks: 4, q: "Describe how mutation and sexual reproduction generate variation for natural selection to act upon.", modelAnswer: "Mutation: random change in DNA base sequence that produces new alleles. [1]\nNew alleles may alter the phenotype, providing novel variation in the population. [1]\nSexual reproduction: meiosis produces genetic variation through independent assortment and crossing over. [1]\nRandom fertilisation further increases the variety of allele combinations in offspring. [1]" },
  { id: "bio_wr_09", cat: "Natural Selection", difficulty: "SL", marks: 3, q: "Explain how overproduction and competition for resources promote natural selection.", modelAnswer: "Most species produce more offspring than the environment can support (overproduction). [1]\nResources (food, space, mates, light) are limited, so individuals must compete. [1]\nNot all individuals survive; those with advantageous heritable traits are more likely to survive and reproduce, passing traits to offspring (differential survival/reproduction). [1]" },
  { id: "bio_wr_10", cat: "Natural Selection", difficulty: "SL", marks: 2, q: "Explain why heritable traits are required for evolutionary change to occur.", modelAnswer: "Only traits encoded in DNA can be passed from parent to offspring. [1]\nIf an advantageous trait is not heritable (e.g. acquired during life), it cannot increase in frequency in the gene pool and evolution cannot occur. [1]" },
  { id: "bio_wr_11", cat: "Natural Selection", difficulty: "AHL", marks: 4, q: "Distinguish between directional, stabilising, and disruptive selection.", modelAnswer: "Directional selection: favours one extreme phenotype; frequency distribution shifts toward that extreme; e.g. antibiotic resistance in bacteria. [1]\nStabilising selection: favours intermediate phenotype; distribution narrows around the mean; e.g. human birth weight. [1]\nDisruptive selection: favours both extremes; distribution becomes bimodal; can lead to speciation; e.g. beak size where two food types are available. [1]\nCorrect comparative language used (e.g. 'unlike stabilising selection, directional selection...'). [1]" },
  { id: "bio_wr_12", cat: "Natural Selection", difficulty: "AHL", marks: 3, q: "In a population, 9% of individuals show the recessive phenotype for a trait. Using the Hardy-Weinberg principle, calculate: (a) the frequency of the recessive allele, (b) the frequency of the dominant allele, and (c) the expected frequency of heterozygotes.", modelAnswer: "q² = 0.09, therefore q = 0.3. [1]\np = 1 – q = 1 – 0.3 = 0.7. [1]\nFrequency of heterozygotes = 2pq = 2 × 0.7 × 0.3 = 0.42 (42%). [1]" },
  { id: "bio_wr_13", cat: "Natural Selection", difficulty: "AHL", marks: 5, q: "State the five conditions required for a population to be in Hardy-Weinberg equilibrium.", modelAnswer: "Large population size (no genetic drift). [1]\nRandom mating (no assortative mating). [1]\nNo mutation (no new alleles introduced). [1]\nNo migration / no gene flow (no alleles entering or leaving). [1]\nNo natural selection (all genotypes equally fit). [1]" },
  { id: "bio_wr_14", cat: "Natural Selection", difficulty: "SL", marks: 4, q: "Explain how the guppy experiment provides a model for studying natural and sexual selection.", modelAnswer: "Guppies from high-predation environment (Crenicichla predator) were dull-coloured; natural selection favoured camouflage. [1]\nWhen moved to low-predation environment (Rivulus predator only), guppies evolved brighter colouration over 15 generations. [1]\nThis shows sexual selection became dominant when predation pressure decreased. [1]\nBy controlling the selection pressure (type of predator), the experiment isolates natural selection vs sexual selection as variables. [1]" },
  { id: "bio_wr_15", cat: "Diversity of Organisms", difficulty: "SL", marks: 3, q: "Outline the binomial system of nomenclature and explain why it is used.", modelAnswer: "Each species is given a two-part Latin name: Genus (capitalised) + species (lowercase), both italicised. [1]\nExample: Homo sapiens. [1]\nUsed to provide a universal, standardised name that avoids confusion from different common names in different languages/regions. [1]" },
  { id: "bio_wr_16", cat: "Diversity of Organisms", difficulty: "SL", marks: 2, q: "State two limitations of the biological species concept.", modelAnswer: "Cannot be applied to asexual organisms (e.g. bacteria, which reproduce by binary fission). [1]\nCannot be applied to fossils (impossible to test interbreeding with extinct organisms) / Ambiguous for ring species (adjacent populations can interbreed but end populations cannot). [1]" },
  { id: "bio_wr_17", cat: "Diversity of Organisms", difficulty: "SL", marks: 3, q: "Explain what a karyogram shows and state one use of karyotyping.", modelAnswer: "A karyogram is an organised image of all chromosomes from a cell, arranged in homologous pairs by size and shape. [1]\nShows chromosome number, size, morphology, and banding patterns. [1]\nUse: detecting chromosomal abnormalities (e.g. Down syndrome / trisomy 21) / determining biological sex / identifying chromosomal translocations. [1]" },
  { id: "bio_wr_18", cat: "Diversity of Organisms", difficulty: "AHL", marks: 3, q: "Explain why the biological species concept is difficult to apply to bacteria, with reference to horizontal gene transfer.", modelAnswer: "Bacteria reproduce asexually, so the criterion of interbreeding to produce fertile offspring does not apply. [1]\nHorizontal gene transfer (HGT) allows genes to pass directly between unrelated bacterial cells (via plasmids/transformation/transduction). [1]\nThis means genes can be shared across what would be considered different 'species,' making it impossible to maintain clear species boundaries. [1]" },
  { id: "bio_wr_19", cat: "Classification & Cladistics", difficulty: "AHL", marks: 3, q: "Explain what a clade is and distinguish it from a paraphyletic group.", modelAnswer: "A clade (monophyletic group) consists of a common ancestor and ALL of its descendants. [1]\nA paraphyletic group includes a common ancestor and some but not all of its descendants. [1]\nExample: traditional 'Reptilia' excluding birds is paraphyletic; birds are descendants of the reptile ancestor but are excluded. [1]" },
  { id: "bio_wr_20", cat: "Classification & Cladistics", difficulty: "AHL", marks: 3, q: "Explain how the molecular clock can be used to estimate when two species diverged from a common ancestor.", modelAnswer: "DNA/RNA mutations accumulate at a roughly constant rate over time. [1]\nBy comparing the number of sequence differences (e.g. nucleotide substitutions) between two species, the degree of divergence can be measured. [1]\nUsing a known or calibrated mutation rate, the time since the two species shared a common ancestor can be estimated. [1]" },
  { id: "bio_wr_21", cat: "Classification & Cladistics", difficulty: "AHL", marks: 3, q: "State three reasons why classification of organisms is necessary.", modelAnswer: "Allows organisation and communication of information about biodiversity. [1]\nEnables prediction of shared characteristics (e.g. biochemistry, physiology). [1]\nHelps identify conservation priorities / assists in drug/pharmacological research. [1]" },
  { id: "bio_wr_22", cat: "Classification & Cladistics", difficulty: "AHL", marks: 3, q: "State the evidence used to classify all life into three domains and name the three domains.", modelAnswer: "Ribosomal RNA (rRNA) base sequence comparisons (16S rRNA for prokaryotes; 18S rRNA for eukaryotes). [1]\nThree domains: Bacteria [1], Archaea [1], Eukarya [1] — award max 2 for naming domains, 1 for evidence." },
  { id: "bio_wr_23", cat: "Natural Selection", difficulty: "SL", marks: 5, q: "Biston betularia moths were placed in two locations: New Forest (unpolluted) and Stoke-on-Trent (polluted). In the New Forest: peppered/branch junction 74% survived, peppered/exposed trunk 68% survived, melanic/branch junction 40% survived, melanic/exposed trunk 62% survived.\n\n(a) Identify the moth type and location with the highest predation (lowest survival). [1]\n(b) Explain the difference in survival rates between peppered and melanic moths in the New Forest. [2]\n(c) Predict the consequences for Biston betularia if pollution near Stoke-on-Trent decreases. [2]", modelAnswer: "(a) Melanic moths at branch junctions in the New Forest (only 40% survived / 60% predated). [1]\n\n(b) The New Forest is unpolluted, so tree bark is light-coloured with lichen; peppered moths are better camouflaged on light bark and are less easily seen by predators; melanic moths are more conspicuous and more heavily predated. [2]\n\n(c) As pollution decreases, soot deposits on trees decline and lichen returns; bark becomes lighter; melanic moths become more visible to predators and are more heavily predated; peppered moth frequency increases in the population over generations. [2]" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
const STATIC_CONTENT = {
  checklistSections: CHECKLIST_SECTIONS,
  flashcardCategories: FLASHCARD_CATEGORIES,
  mcqQuestions: MCQ_QUESTIONS,
  writtenQuestions: WRITTEN_QUESTIONS,
  catColors: {
    "Evolution & Speciation": "#34D399",
    "Natural Selection": "#38BDF8",
    "Diversity of Organisms": "#FB923C",
    "Classification & Cladistics": "#A78BFA",
  },
};

const ContentCtx = createContext(STATIC_CONTENT);
const useContent = () => useContext(ContentCtx);

// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST VIEW
// ─────────────────────────────────────────────────────────────────────────────
function ChecklistView() {
  const { checklistSections } = useContent();
  const [checked, setChecked] = useState(() => loadLS("bio_checklist_checked", {}));
  const [openSections, setOpenSections] = useState(() => {
    const collapsed = loadLS("bio_checklist_collapsed", {});
    return checklistSections.filter(s => !collapsed[s.id]).map(s => s.id);
  });
  const toggle = id => setChecked(p => { const next = { ...p, [id]: !p[id] }; saveLS("bio_checklist_checked", next); return next; });
  const handleAccordion = (value) => {
    setOpenSections(value);
    const collapsed = {};
    checklistSections.forEach(s => { if (!value.includes(s.id)) collapsed[s.id] = true; });
    saveLS("bio_checklist_collapsed", collapsed);
  };
  const totalItems = checklistSections.reduce((s, sec) => s + sec.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);
  const progColor = progress < 30 ? "#F87171" : progress < 70 ? "#FBBF24" : "#34D399";

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
      <Paper bg="#12121A" radius="lg" p="xl" mb="xl" style={{ border: "1px solid #252533", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <Group justify="space-between" mb="xs">
          <Text fz="sm" c="#8B8B9E" ff="'JetBrains Mono', monospace">Overall Progress</Text>
          <Text fz={24} fw={800} c={progColor}>{progress}%</Text>
        </Group>
        <Progress value={progress} size="md" radius="xl" color={progColor} animated styles={{ root: { background: "#1E1E2A" } }} />
        <Group justify="space-between" mt="sm">
          <Text fz="xs" c="#55556A">{checkedCount} of {totalItems} topics covered</Text>
          <Badge size="xs" variant="light" color="teal" ff="'JetBrains Mono', monospace">auto-saved</Badge>
        </Group>
      </Paper>

      <Accordion multiple value={openSections} onChange={handleAccordion} variant="separated" radius="md"
        styles={{
          item: { backgroundColor: "#12121A", border: "1px solid #252533", marginBottom: 12 },
          control: { padding: "14px 20px" },
          content: { padding: "4px 20px 16px", borderTop: "1px solid #252533" },
          chevron: { color: "#55556A" },
        }}
      >
        {checklistSections.map(section => {
          const sectionChecked = section.items.filter((_, i) => checked[`${section.id}-${i}`]).length;
          const allDone = sectionChecked === section.items.length;
          return (
            <Accordion.Item value={section.id} key={section.id} style={{ borderLeft: `4px solid ${section.color}` }}>
              <Accordion.Control>
                <Group gap="sm">
                  <Badge variant="light" size="sm" fw={700} ff="'JetBrains Mono', monospace"
                    style={{ backgroundColor: section.color + "22", color: section.color, border: "none" }}>
                    {sectionChecked}/{section.items.length}
                  </Badge>
                  <Text fw={600} fz="sm" c={allDone ? section.color : "#F0EEE8"}>
                    {allDone && "✓ "}{section.title}
                  </Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap={4}>
                  {section.items.map((item, i) => {
                    const key = `${section.id}-${i}`;
                    const isChecked = checked[key];
                    const isAHL = item.startsWith("(AHL)");
                    return (
                      <Checkbox key={key} checked={!!isChecked} onChange={() => toggle(key)} label={item} color={section.color} radius="sm"
                        styles={{
                          root: { padding: "6px 4px", borderRadius: 8, cursor: "pointer", transition: "background 0.15s" },
                          label: { color: isChecked ? "#55556A" : isAHL ? "#FBBF24" : "#C8C4BC", textDecoration: isChecked ? "line-through" : "none", fontSize: 14, lineHeight: 1.5, cursor: "pointer" },
                          input: { cursor: "pointer" },
                        }}
                      />
                    );
                  })}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Text ta="center" mt="lg" c="#55556A" fz="xs">
        Click any item to mark it as revised ·{" "}
        <Text component="span" c="#34D399" style={{ cursor: "pointer" }} onClick={() => { setChecked({}); saveLS("bio_checklist_checked", {}); }}>Reset all</Text>
      </Text>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARD COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function FlashCard({ card, catColor }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flashcard-container" onClick={() => setFlipped(f => !f)}>
      <div className={`flashcard-inner${flipped ? " flipped" : ""}`}>
        <Paper className="flashcard-face" bg="#1A1A24"
          style={{ border: "1px solid #252533", boxShadow: "0 2px 8px rgba(0,0,0,0.3)", alignItems: "center", padding: 24, textAlign: "center" }}>
          <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" tt="uppercase" lts={2} mb="md">TERM</Text>
          <Text fz={20} fw={700} c="#F0EEE8" lh={1.3}>{card.term}</Text>
          <Text fz={11} c="#55556A" mt="lg">tap to reveal</Text>
        </Paper>
        <Paper className="flashcard-face flashcard-back" bg="#1A1A24"
          style={{ border: "1px solid #252533", boxShadow: "0 2px 8px rgba(0,0,0,0.3)", padding: 20, overflowY: "auto" }}>
          <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" tt="uppercase" lts={2} mb="sm">DEFINITION</Text>
          <Text fz={13} c="#C8C4BC" lh={1.65}>{card.def}</Text>
        </Paper>
      </div>
    </div>
  );
}

function FlashcardsView() {
  const { flashcardCategories } = useContent();
  const [activeCat, setActiveCat] = useState(() => loadLS("bio_fc_cat", flashcardCategories[0]?.id));
  const [cardIdx, setCardIdx] = useState(0);
  const currentCat = flashcardCategories.find(c => c.id === activeCat) || flashcardCategories[0];
  if (!currentCat || !currentCat.cards || currentCat.cards.length === 0) return <Text ta="center" c="#55556A" py="xl">Loading flashcards…</Text>;
  const currentCard = currentCat.cards[Math.min(cardIdx, currentCat.cards.length - 1)];

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 0 40px" }}>
      <Group gap={8} mb="lg" style={{ flexWrap: "wrap" }}>
        {flashcardCategories.map(cat => (
          <Button key={cat.id} size="sm" onPress={() => { setActiveCat(cat.id); saveLS("bio_fc_cat", cat.id); setCardIdx(0); }}
            className="rounded-full text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", backgroundColor: activeCat === cat.id ? cat.color : "#1A1A24", color: activeCat === cat.id ? "#fff" : "#8B8B9E", border: `1px solid ${activeCat === cat.id ? cat.color : "#252533"}` }}>
            {cat.label}
          </Button>
        ))}
      </Group>

      <Group justify="space-between" mb="md">
        <Text fz="xs" c="#55556A" ff="'JetBrains Mono', monospace">{cardIdx + 1} / {currentCat.cards.length} — {currentCat.label}</Text>
        <Box style={{ background: "#1A1A24", borderRadius: 99, height: 4, width: 140, overflow: "hidden" }}>
          <div style={{ width: `${((cardIdx + 1) / currentCat.cards.length) * 100}%`, height: "100%", background: currentCat.color, borderRadius: 99, transition: "width 0.3s" }} />
        </Box>
      </Group>

      <FlashCard key={`${activeCat}-${cardIdx}`} card={currentCard} catColor={currentCat.color} />

      <Group grow gap="sm" mt="md">
        <Button variant="ghost" size="md" isDisabled={cardIdx === 0} onPress={() => setCardIdx(i => Math.max(0, i - 1))}
          className="rounded-md bg-[#1A1A24] border border-[#252533] text-[#8B8B9E] disabled:bg-[#12121A] disabled:border-[#1E1E2A]">
          Previous
        </Button>
        <Button size="md" isDisabled={cardIdx === currentCat.cards.length - 1} onPress={() => setCardIdx(i => Math.min(currentCat.cards.length - 1, i + 1))}
          className="rounded-md border-none text-white"
          style={{ background: cardIdx === currentCat.cards.length - 1 ? "#1E1E2A" : currentCat.color }}>
          Next
        </Button>
      </Group>
      <Text ta="center" fz="xs" c="#55556A" mt="md">Tap any card to flip it</Text>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MCQ COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function MCQItem({ q, displayNum }) {
  const { catColors } = useContent();
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const color = catColors[q.cat] || "#34D399";
  const { recordAttempt } = useAttemptTracker(q.id, "mcq", q.cat, "biology", q.difficulty);

  return (
    <Paper bg="#1A1A24" radius="lg" mb="sm" style={{ border: "1px solid #252533", overflow: "hidden", transition: "all 0.2s" }}>
      <div style={{ borderLeft: `4px solid ${color}`, padding: "18px 20px" }}>
        <Group gap={8} mb="sm" style={{ flexWrap: "wrap" }}>
          <Badge size="xs" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color, color: "#fff" }}>MCQ</Badge>
          <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none" }}>{q.cat}</Badge>
          <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" style={{ backgroundColor: "#1E1E2A", color: "#8B8B9E", border: "none" }}>{q.difficulty}</Badge>
        </Group>
        <Text fz={15} c="#F0EEE8" lh={1.6} fw={600}>Q{displayNum}. {q.q}</Text>
      </div>
      <Stack gap={8} p="md" pt="sm">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.answer;
          let bg = "#12121A", border = "#252533", tc = "#C8C4BC";
          if (confirmed) {
            if (isCorrect) { bg = "#34D399" + "22"; border = "#34D399"; tc = "#6EE7B7"; }
            else if (isSelected && !isCorrect) { bg = "#F87171" + "22"; border = "#F87171"; tc = "#FCA5A5"; }
          } else if (isSelected) { bg = color + "22"; border = color; tc = "#F0EEE8"; }
          return (
            <Paper key={i} p="sm" radius="md" onClick={() => { if (!confirmed) setSelected(i); }}
              style={{ background: bg, border: `1.5px solid ${border}`, cursor: confirmed ? "default" : "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { if (!confirmed && !isSelected) e.currentTarget.style.borderColor = color + "66"; }}
              onMouseLeave={e => { if (!confirmed && !isSelected) e.currentTarget.style.borderColor = "#252533"; }}>
              <Group gap="sm" wrap="nowrap">
                <Box style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0, background: confirmed && isCorrect ? "#34D399" : confirmed && isSelected && !isCorrect ? "#F87171" : isSelected ? color : "#252533", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Text fz={11} ff="'JetBrains Mono', monospace" c="#fff" fw={700}>
                    {confirmed && isCorrect ? "✓" : confirmed && isSelected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}
                  </Text>
                </Box>
                <Text fz={14} c={tc} lh={1.4}>{opt}</Text>
              </Group>
            </Paper>
          );
        })}
        {!confirmed ? (
          <Button fullWidth isDisabled={selected === null}
            onPress={() => { if (selected !== null) { setConfirmed(true); recordAttempt({ userAnswer: selected, isCorrect: selected === q.answer }); } }}
            className="rounded-md mt-1 font-semibold border-none"
            style={{ background: selected !== null ? color : "#1E1E2A", color: selected === null ? "#55556A" : "#fff", fontFamily: "'JetBrains Mono', monospace" }}>
            Check Answer
          </Button>
        ) : (
          <Box mt="xs" p="sm" style={{ background: "#0D0D14", borderRadius: 8, borderLeft: `3px solid ${color}` }}>
            <Text fz={11} ff="'JetBrains Mono', monospace" c={color} lts={1} mb={4}>EXPLANATION</Text>
            <Text fz={13} c="#B0ADA6" lh={1.6}>{q.explanation}</Text>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

function PracticeView() {
  const { mcqQuestions, catColors } = useContent();
  const allCats = ["All", ...Array.from(new Set(mcqQuestions.map(q => q.cat)))];
  const [filterCat, setFilterCat] = useState("All");
  const filtered = filterCat === "All" ? mcqQuestions : mcqQuestions.filter(q => q.cat === filterCat);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 0 40px" }}>
      <Group gap={8} mb="lg" style={{ flexWrap: "wrap" }}>
        {allCats.map(cat => {
          const c = catColors[cat] || "#34D399";
          const active = filterCat === cat;
          return (
            <Button key={cat} size="sm" className="rounded-full" onPress={() => setFilterCat(cat)}
              style={{ backgroundColor: active ? c : "#1A1A24", color: active ? "#fff" : "#8B8B9E", border: `1px solid ${active ? c : "#252533"}`, boxShadow: "none", fontFamily: "'JetBrains Mono', monospace" }}>
              {cat}
            </Button>
          );
        })}
      </Group>

      <Text fz="xs" c="#55556A" ff="'JetBrains Mono', monospace" mb="lg">
        Showing {filtered.length} question{filtered.length !== 1 ? "s" : ""}{filterCat !== "All" ? ` · ${filterCat}` : ""}
      </Text>

      {filtered.length === 0 && <Text ta="center" py={40} c="#55556A" fz="sm">No questions match this filter.</Text>}
      {filtered.map((q, i) => <MCQItem key={q.id} q={q} displayNum={i + 1} />)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITTEN PRACTICE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function WrittenPracticeItem({ q, displayNum }) {
  const { catColors } = useContent();
  const [answer, setAnswer] = useState(() => loadLS(`bio_written_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`bio_written_grade_${q.id}`, null));
  const color = catColors[q.cat] || "#34D399";
  const { recordAttempt } = useAttemptTracker(q.id, "written", q.cat, "biology", q.difficulty);

  useEffect(() => { saveLS(`bio_written_ans_${q.id}`, answer); }, [answer, q.id]);
  useEffect(() => { saveLS(`bio_written_grade_${q.id}`, gradeResult); }, [gradeResult, q.id]);

  const handleSolve = async () => {
    if (!answer.trim()) return;
    setGrading(true);
    setGradeResult(null);
    try {
      const res = await fetch("https://ib-grading-hollen.c9tggsfst9.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.q, studentAnswer: answer, expectedAnswer: q.modelAnswer, marks: q.marks }),
      });
      const data = await res.json();
      if (data.error) {
        setGradeResult({ score: null, feedback: data.details || data.error });
      } else {
        setGradeResult({ score: data.score, maxMarks: data.maxMarks || q.marks, feedback: data.feedback });
        recordAttempt({ userAnswer: answer, score: data.score, maxMarks: data.maxMarks || q.marks });
      }
    } catch {
      setGradeResult({ score: null, feedback: "Could not connect to grading server. Please try again later." });
    } finally {
      setGrading(false);
    }
  };

  const scorePct = gradeResult?.score != null ? gradeResult.score / (gradeResult.maxMarks || q.marks) : 0;
  const scoreColor = gradeResult?.score != null ? scorePct >= 0.75 ? "#34D399" : scorePct >= 0.4 ? "#FBBF24" : "#F87171" : "#8B8B9E";

  return (
    <Paper bg="#1A1A24" radius="lg" mb="md" style={{ border: "1px solid #252533", overflow: "hidden" }}>
      <div style={{ borderLeft: `4px solid ${color}`, padding: "18px 20px" }}>
        <Group gap={8} mb="sm" style={{ flexWrap: "wrap" }}>
          <Badge size="xs" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none" }}>{q.cat}</Badge>
          <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" style={{ backgroundColor: "#1E1E2A", color: "#8B8B9E", border: "none" }}>{q.difficulty}</Badge>
          <Badge size="xs" ff="'JetBrains Mono', monospace" ml="auto" style={{ backgroundColor: "#2A2800", color: "#FBBF24", border: "1px solid #5A4A00" }}>[ {q.marks} marks ]</Badge>
        </Group>
        <Text fz={15} c="#F0EEE8" lh={1.6} fw={600} style={{ whiteSpace: "pre-line" }}>Q{displayNum}. {q.q}</Text>
      </div>

      <div style={{ padding: "12px 20px 16px" }}>
        <TextArea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer here..." rows={5} disabled={grading} fullWidth
          className="rounded-md bg-[#12121A] border border-[#252533] text-[#F0EEE8] text-sm leading-relaxed placeholder:text-[#55556A] p-3 mb-2"
          style={{ fontFamily: "'Inter', sans-serif", resize: "vertical" }} />

        <Group gap="sm">
          <Button size="sm" className="rounded-md border-none font-semibold" onPress={handleSolve} isPending={grading}
            isDisabled={!answer.trim() || grading}
            style={{ background: answer.trim() && !grading ? "#34D399" : "#1E1E2A", fontFamily: "'JetBrains Mono', monospace" }}>
            {({ isPending }) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Grading..." : "Solve"}</>}
          </Button>
          <Button size="sm" variant="ghost" className={revealed ? "rounded-md text-[#8B8B9E]" : "rounded-md"} onPress={() => setRevealed(r => !r)}
            style={revealed ? { fontFamily: "'JetBrains Mono', monospace" } : { backgroundColor: color + "22", color, border: `1px solid ${color}44`, fontFamily: "'JetBrains Mono', monospace" }}>
            {revealed ? "Hide Markscheme" : "Show Markscheme"}
          </Button>
          {answer.trim() && !grading && (
            <Button size="sm" variant="ghost" className="rounded-md text-[#8B8B9E]" style={{ fontFamily: "'JetBrains Mono', monospace" }}
              onPress={() => { setAnswer(""); setGradeResult(null); saveLS(`bio_written_ans_${q.id}`, ""); saveLS(`bio_written_grade_${q.id}`, null); }}>
              Clear
            </Button>
          )}
        </Group>

        {gradeResult && (
          <Alert mt="md" radius="md" variant="light"
            color={gradeResult.score == null ? "gray" : scorePct >= 0.75 ? "green" : scorePct >= 0.4 ? "yellow" : "red"}
            title={gradeResult.score != null ? `AI Score: ${gradeResult.score}/${gradeResult.maxMarks || q.marks}` : "Grading Error"}
            styles={{
              root: { backgroundColor: (gradeResult.score == null ? "#8B8B9E" : scoreColor) + "11", border: `1px solid ${gradeResult.score == null ? "#8B8B9E" : scoreColor}44` },
              title: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12 },
            }}>
            {gradeResult.score != null && (
              <Progress value={scorePct * 100} color={scoreColor} size="sm" radius="xl" mb="sm" animated styles={{ root: { background: "#1E1E2A" } }} />
            )}
            <Text fz="sm" c="#8B8B9E" lh={1.6}>{gradeResult.feedback}</Text>
          </Alert>
        )}

        <Collapse in={revealed}>
          <Box mt="md" pt="md" style={{ borderTop: "1px solid #252533" }}>
            <Text fz={11} ff="'JetBrains Mono', monospace" c="#34D399" lts={1} mb="sm">MARKSCHEME</Text>
            <Text fz={13} c="#B0ADA6" lh={1.7} style={{ whiteSpace: "pre-line" }}>{q.modelAnswer}</Text>
          </Box>
        </Collapse>
      </div>
    </Paper>
  );
}

function WrittenPracticeView() {
  const { writtenQuestions, catColors } = useContent();
  const [filterCat, setFilterCat] = useState("All");
  const writtenCats = ["All", ...Array.from(new Set(writtenQuestions.map(q => q.cat)))];
  const filtered = filterCat === "All" ? writtenQuestions : writtenQuestions.filter(q => q.cat === filterCat);

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
      <Paper bg="#12121A" radius="lg" p="lg" mb="xl" style={{ border: "1px solid #252533" }}>
        <Text fz="sm" c="#F0EEE8" fw={600} mb={4}>Written Practice</Text>
        <Text fz="xs" c="#8B8B9E" lh={1.5}>
          Answer each question in the text box, then use AI grading or reveal the markscheme to compare.
        </Text>
      </Paper>

      <Group gap={8} mb="lg" style={{ flexWrap: "wrap" }}>
        {writtenCats.map(cat => {
          const c = catColors[cat] || "#34D399";
          const active = filterCat === cat;
          return (
            <Button key={cat} size="sm" className="rounded-full" onPress={() => setFilterCat(cat)}
              style={{ backgroundColor: active ? c : "#1A1A24", color: active ? "#fff" : "#8B8B9E", border: `1px solid ${active ? c : "#252533"}`, boxShadow: "none", fontFamily: "'JetBrains Mono', monospace" }}>
              {cat}
            </Button>
          );
        })}
      </Group>

      <Text fz="xs" c="#55556A" ff="'JetBrains Mono', monospace" mb="lg">
        Showing {filtered.length} question{filtered.length !== 1 ? "s" : ""}{filterCat !== "All" ? ` · ${filterCat}` : ""}
      </Text>

      {filtered.length === 0 && <Text ta="center" py={40} c="#55556A" fz="sm">No questions match this filter.</Text>}
      {filtered.map((q, i) => <WrittenPracticeItem key={q.id} q={q} displayNum={i + 1} />)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function BiologyPage({ initialTab = "checklist" }) {
  const [tab] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ContentCtx.Provider value={STATIC_CONTENT}>
      <Box mih="100vh" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-primary)", background: "var(--bg-base)" }}>

        <Sidebar activeSubject="biology" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Sticky header */}
        <Box style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--header-bg)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(128,128,128,0.1)" }}>
          <Container size="lg" py="sm">
            <Group justify="center" mb={4} style={{ position: "relative" }}>
              <Button isIconOnly variant="outline" onPress={() => setSidebarOpen(o => !o)}
                className="rounded-md border-[#252533] text-[#8B8B9E] bg-transparent min-w-[auto] h-8 px-2.5"
                style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
              <Badge variant="light" size="sm" tt="uppercase" fw={700} ff="'JetBrains Mono', monospace"
                style={{ letterSpacing: 2, backgroundColor: "#34D39918", color: "#34D399", border: "none" }}>
                IB Biology SL & HL
              </Badge>
              <LoginButton />
            </Group>
            <Text ta="center" fw={800} fz={{ base: 22, sm: 30 }} c="#F0EEE8" style={{ letterSpacing: -0.5 }}>
              Unit 1: The Evolution of Life
            </Text>
            <Text ta="center" fz="xs" c="#55556A" mb="sm">
              A4.1 · D4.1 · A3.1 · A3.2 · {STATIC_CONTENT.mcqQuestions.length} MCQs · {STATIC_CONTENT.writtenQuestions.length} Written Questions
            </Text>

            <Group gap={4} grow>
              {[
                { value: "checklist", label: "Checklist", href: "/biology/checklist" },
                { value: "flashcards", label: "Flashcards", href: "/biology/flashcards" },
                { value: "practice", label: "Multi-Choice", href: "/biology/multi-choice" },
                { value: "written", label: "Written", href: "/biology/written" },
              ].map(t => (
                <a key={t.value} href={t.href} style={{ flex: 1, textDecoration: "none" }}>
                  <Button fullWidth className="rounded-none font-semibold"
                    style={{ fontSize: 13, padding: "10px 4px 12px", backgroundColor: "transparent", color: tab === t.value ? "#F0EEE8" : "#55556A", borderBottom: tab === t.value ? "3px solid #34D399" : "3px solid transparent", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0, transition: "all 0.2s", fontFamily: "'Inter', sans-serif" }}>
                    {t.label}
                  </Button>
                </a>
              ))}
            </Group>
          </Container>
        </Box>

        {/* Content */}
        <Container size="lg" py="xl" px="md">
          {tab === "checklist" && <ChecklistView />}
          {tab === "flashcards" && <FlashcardsView />}
          {tab === "practice" && <PracticeView />}
          {tab === "written" && <WrittenPracticeView />}
        </Container>

        {/* Floating support button */}
        <a href="https://donate.stripe.com/aFa7sN64kbjBdj8ayH4ow01" target="_blank" rel="noopener noreferrer"
          style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999, width: 48, height: 48, borderRadius: "50%", backgroundColor: "#34D399", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(52,211,153,0.4)", border: "none", cursor: "pointer", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
          title="Support us"
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(52,211,153,0.6)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(52,211,153,0.4)"; }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </a>

        <Analytics />
      </Box>
    </ContentCtx.Provider>
  );
}
