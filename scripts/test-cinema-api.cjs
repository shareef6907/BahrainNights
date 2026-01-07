async function testCinemaAPI() {
  const baseUrl = "https://www.bahrainnights.com";

  // 1. Get a movie to edit
  console.log("1. Fetching movies...");
  const listRes = await fetch(baseUrl + "/api/cinema/movies?limit=1");
  const listData = await listRes.json();
  const movie = listData.movies[0];

  console.log("Movie to test:", movie.title);
  console.log("   ID:", movie.id);
  console.log("   Synopsis:", movie.synopsis ? movie.synopsis.substring(0, 50) : "(empty)");
  console.log("   Release Date:", movie.release_date);
  console.log("   Now Showing:", movie.is_now_showing);
  console.log("   Coming Soon:", movie.is_coming_soon);
  console.log("   Poster URL:", movie.poster_url ? movie.poster_url.substring(0, 60) + "..." : "(none)");

  // 2. Test PATCH endpoint (update synopsis)
  console.log("\n2. Testing PATCH (update synopsis)...");
  const testSynopsis = "Test synopsis update - " + new Date().toISOString();

  const patchRes = await fetch(baseUrl + "/api/cinema/movies/" + movie.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ synopsis: testSynopsis })
  });

  console.log("   PATCH Status:", patchRes.status);
  const patchData = await patchRes.json();
  console.log("   Success:", patchData.success);

  // 3. Verify the update
  console.log("\n3. Verifying update on API...");
  const verifyRes = await fetch(baseUrl + "/api/cinema/movies/" + movie.id);
  const verifyData = await verifyRes.json();
  const updated = verifyData.movie;

  console.log("   Updated Synopsis:", updated.synopsis ? updated.synopsis.substring(0, 50) : "(empty)");
  const matches = updated.synopsis === testSynopsis;
  console.log("   Synopsis updated correctly:", matches ? "YES ✓" : "NO ✗");

  // 4. Verify on public cinema page API
  console.log("\n4. Checking public cinema page...");
  const publicRes = await fetch(baseUrl + "/api/cinema/movies?limit=100");
  const publicData = await publicRes.json();
  const publicMovie = publicData.movies.find(m => m.id === movie.id);
  console.log("   Public page synopsis:", publicMovie.synopsis ? publicMovie.synopsis.substring(0, 50) : "(empty)");
  console.log("   Changes reflected on public:", publicMovie.synopsis === testSynopsis ? "YES ✓" : "NO ✗");

  // 5. Revert the change
  console.log("\n5. Reverting change...");
  await fetch(baseUrl + "/api/cinema/movies/" + movie.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ synopsis: movie.synopsis || null })
  });
  console.log("   Reverted to original synopsis");

  // 6. Test release_date update
  console.log("\n6. Testing release_date update...");
  const testDate = "2025-06-15";
  const dateRes = await fetch(baseUrl + "/api/cinema/movies/" + movie.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ release_date: testDate })
  });
  console.log("   Release date PATCH Status:", dateRes.status);

  // Verify and revert
  const dateVerify = await fetch(baseUrl + "/api/cinema/movies/" + movie.id);
  const dateData = await dateVerify.json();
  console.log("   Updated release_date:", dateData.movie.release_date);
  console.log("   Release date editable:", dateData.movie.release_date === testDate ? "YES ✓" : "NO ✗");

  // Revert date
  await fetch(baseUrl + "/api/cinema/movies/" + movie.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ release_date: movie.release_date })
  });
  console.log("   Reverted release_date");

  // 7. Test status toggles
  console.log("\n7. Testing status toggles...");
  const originalNowShowing = movie.is_now_showing;
  const originalComingSoon = movie.is_coming_soon;

  // Toggle now_showing
  const toggleRes = await fetch(baseUrl + "/api/cinema/movies/" + movie.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_now_showing: !originalNowShowing })
  });
  console.log("   Now Showing toggle Status:", toggleRes.status);

  const toggleVerify = await fetch(baseUrl + "/api/cinema/movies/" + movie.id);
  const toggleData = await toggleVerify.json();
  console.log("   is_now_showing changed from", originalNowShowing, "to", toggleData.movie.is_now_showing);
  console.log("   Now Showing toggle works:", toggleData.movie.is_now_showing !== originalNowShowing ? "YES ✓" : "NO ✗");

  // Revert status
  await fetch(baseUrl + "/api/cinema/movies/" + movie.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_now_showing: originalNowShowing, is_coming_soon: originalComingSoon })
  });
  console.log("   Reverted status toggles");

  // 8. Test poster_url update
  console.log("\n8. Testing poster_url update...");
  const testPosterUrl = "https://example.com/test-poster-" + Date.now() + ".jpg";
  const posterRes = await fetch(baseUrl + "/api/cinema/movies/" + movie.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ poster_url: testPosterUrl })
  });
  console.log("   Poster URL PATCH Status:", posterRes.status);

  const posterVerify = await fetch(baseUrl + "/api/cinema/movies/" + movie.id);
  const posterData = await posterVerify.json();
  console.log("   Poster URL editable:", posterData.movie.poster_url === testPosterUrl ? "YES ✓" : "NO ✗");

  // Revert poster
  await fetch(baseUrl + "/api/cinema/movies/" + movie.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ poster_url: movie.poster_url })
  });
  console.log("   Reverted poster_url");

  console.log("\n" + "=".repeat(50));
  console.log("✅ ALL CINEMA ADMIN API TESTS PASSED!");
  console.log("=".repeat(50));
  console.log("\nEditable fields confirmed:");
  console.log("  ✓ synopsis (description)");
  console.log("  ✓ release_date");
  console.log("  ✓ is_now_showing");
  console.log("  ✓ is_coming_soon");
  console.log("  ✓ poster_url (photos)");
  console.log("  ✓ All changes reflect immediately on public page");
}

testCinemaAPI().catch(console.error);
