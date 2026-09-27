/* ============================================================
   Be Craftee — content data
   Add new makes or journal entries here; the rest of the site
   renders itself from these two arrays. No build step needed.
   ============================================================ */

const PRODUCTS = [
  {
    id: "sunflower-bookmarks",
    name: "Sunflower Bookmark Duo",
    tag: "Bookmarks",
    image: "assets/images/sunflower-bookmarks.jpg",
    rotate: "-3deg",
    blurb: "A pair of tiny sunflowers on a forest-green cord, sized to loop over a page corner and hang out while you read.",
    details: "Worked in cotton yarn with a dark centre and layered petals, finished with a crocheted loop long enough to mark your spot without slipping out.",
  },
  {
    id: "evil-eye-charm",
    name: "Evil Eye Bookmark Charm",
    tag: "Charms",
    image: "assets/images/evil-eye-charm.jpg",
    rotate: "2deg",
    blurb: "A round little guardian in blue and white, with a deep indigo tassel that trails down the page like a proper bookmark.",
    details: "Stitched in the round with a contrast rim, backed and stuffed for a bit of weight, then finished with a hand-tied tassel and a jump ring loop.",
  },
  {
    id: "bouquet-keyring",
    name: "Forget-Me-Not Bouquet Keyring",
    tag: "Keyrings",
    image: "assets/images/bouquet-keyring.jpg",
    rotate: "-2deg",
    blurb: "A wrapped little bouquet with a white daisy face and a leaf tucked in, tied off with a pink ribbon and a keyring at the top.",
    details: "Crocheted flat and shaped into a cone, with an embroidered centre and a satin ribbon bow. Clips onto keys, bags, or a zipper pull.",
  },
  {
    id: "violet-daisy-bookmark",
    name: "Violet & Daisy Bookmark",
    tag: "Bookmarks",
    image: "assets/images/violet-daisy-bookmark.jpg",
    rotate: "3deg",
    blurb: "A long violet strap with a white daisy stitched on, made to sit flat inside a book without leaving a crease.",
    details: "A simple flat-strap construction so it never bulges the spine, with a five-petal daisy appliqué stitched on by hand.",
  },
];

const POSTS = [
  {
    slug: "why-i-started-be-craftee",
    title: "Why I started Be Craftee",
    category: "Behind the Brand",
    date: "2026-08-02",
    cover: "assets/images/violet-daisy-bookmark.jpg",
    excerpt: "It started with one bookmark I made so I'd stop losing my page, and it hasn't really stopped since.",
    readMinutes: 4,
    body: [
      "I didn't set out to start a small business. I started out losing my page in every book I read, and getting mildly annoyed about it every single time.",
      "The first thing I ever crocheted on purpose — not counting the lumpy, shapeless practice swatches — was a bookmark. It was uneven and a bit too short, but it worked, and there was something satisfying about using a thing I'd made with my own hands for something I did every single day.",
      "A few friends saw it and asked for their own. Then their friends asked. Somewhere in there I picked a name, made a little logo, and started keeping a proper list of what I wanted to try next: charms, keyrings, small bouquets that don't wilt.",
      "Be Craftee is still small, and I like it that way. Everything here is made in batches, by hand, usually with a book open next to me. If something takes a little longer to arrive, it's probably because I was making sure the stitches were even.",
    ],
  },
  {
    slug: "sunflowers-that-started-it-all",
    title: "The sunflowers that started it all",
    category: "Process",
    date: "2026-08-19",
    cover: "assets/images/sunflower-bookmarks.jpg",
    excerpt: "A walk through how a two-tone flower goes from a ring of chain stitches to a bookmark that survives a school bag.",
    readMinutes: 5,
    body: [
      "The sunflower bookmark is the piece I get asked to restock the most, so I thought I'd write down how it actually comes together.",
      "It starts with the centre: a tight, dense circle in dark brown so no stuffing peeks through. Petals are worked separately, two layers of them, slightly offset so the flower reads as full instead of flat.",
      "The cord is the part people underestimate. It has to be long enough to loop comfortably over a stack of pages, tight enough not to unravel in a bag, and finished off cleanly at both ends — otherwise it's the first thing to fray.",
      "Every duo is slightly different, because I don't chart the petal placement, I just go by eye. That's the part I like best: no two sunflowers are quite the same, even though the pattern is.",
    ],
  },
  {
    slug: "caring-for-your-crochet-pieces",
    title: "Caring for your crochet pieces",
    category: "Care Guide",
    date: "2026-09-05",
    cover: "assets/images/evil-eye-charm.jpg",
    excerpt: "A few small habits that keep handmade cotton pieces looking new for years instead of months.",
    readMinutes: 3,
    body: [
      "Crochet pieces are sturdier than they look, but a little bit of care goes a long way. Here's what I tell everyone who orders from Be Craftee.",
      "Keep them out of direct sun for long stretches — cotton yarn can fade unevenly, and the brightest colours go first. A shelf or a drawer is kinder than a sunny windowsill.",
      "If something needs a clean, hand wash in cool water with a mild detergent, and press the water out gently instead of wringing. Let it dry flat on a towel so it keeps its shape.",
      "Store bookmarks flat inside a book rather than folded in a bag pocket, and give charms and keyrings their own little space so the tassels don't tangle with keys or zips.",
      "Treated gently, a crochet piece will easily outlast the book you first used it in.",
    ],
  },
];
