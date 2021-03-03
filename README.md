<div align="center">
  <h3>The Ember Dev Test ✨</h3>
  <a href="https://www.notion.so/emberhub/The-Ember-Dev-Test-8c34f1edfa0b43fcabe400cd5dc48bb">See spec here</a>
</div>

## Notes

- Adding uuid library to have a better control on the id creation for each newly created todo. Using autoincrement require to then know the state of both the remote and the local database. Reconciliating them when going back online could create some issues.
- Apollo provide different cache strategies to handle cases when we want to use the cache or not. In our case, we want the cache to be the priority as when being offline, the user will still be able to modify the data. So we want to use the `cache-first` strategy.
- In order to correctly merge the remote state with the local state, we have to use a specific merge mechanism to have more control on the priority between the remote state and the cache.
- I used the emulator to make the test and the NetInfo library is doing the job to detect network status changes. However, when going back online, the emulator is not able to detect that event so the indicator remain on "disconnected". I believe this would work with a real device
- Using `errorPolicy` in the different triggers is ensuring that no error is triggered when offline. That gives us the ability to manage both the remote state and the local state from a single method ( `update` ).

## Additional notes

- This could be improved by adding some unit tests and verify the different merging strategies ( add, update, delete )