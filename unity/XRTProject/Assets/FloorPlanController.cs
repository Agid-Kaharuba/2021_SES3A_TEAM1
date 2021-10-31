using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.Events;
using UnityEngine;

public class FloorPlanController : MonoBehaviour {

    public GameObject table;
    public GameObject fridge;
    public GameObject grill;
    public GameObject microwave;
    public GameObject sink;
    public GameObject rangehood;
    public GameObject choppingBoard;
    public GameObject fireExtinguisher;
    public GameObject mopBucket;
    public GameObject mop;
    public GameObject plate;

    private Vector3 offset = new Vector3 ( 1.258f, 0, 2.487f );
    private float verticalShift = 1.0f;
    private float horizontalShift = 0.4f;

    private ApiService apiService;

    [SerializeField] public UnityEvent OnCustomizationSettingsChanged;

    private FloorModel floorPlan;

    private bool plateSpawned = false;

    private void Awake () {
        string token;

        try {
            token = LaunchArgsService.GetToken ();
        } catch ( Exception e ) {
            throw new Exception ( "Cannot start application without any token!" );
        }

        apiService = new ApiService ( token );
        gameObject.AddComponent<Track> ().Setup ( apiService );

        StartCoroutine ( apiService.GetFloorPlan ( ( response ) => {
            if ( response is BackendErrorResponse errorReponse ) {
                Debug.LogError ( $"Could not get floor plan data: {errorReponse.Message}" );
            } else if ( response is FloorModel floorModel ) {
                Debug.Log ( "Retrieved floor plan data!" );
                Debug.Log ( floorModel.coordinate [ 0 ].objectType );
                floorPlan = floorModel;
            }
            OnCustomizationSettingsChanged?.Invoke ();
        } ) );
    }

    void Start() {
        SpawnFloorPlanObjects ();
    }

    void Update() {
        
    }
    
    private void SpawnStandardObject(GameObject obj, Vector3 position, Vector3 rotation) {
        GameObject temp = Instantiate ( obj, position, Quaternion.Euler(rotation.x, rotation.y, rotation.z) );
        temp.transform.SetParent ( this.transform );
    }

    private void SpawnFloorPlanObjects () {
        float translatedX = 0;
        float translatedY = 0;
        Vector3 rotation = new Vector3 ( 0, 0, 0 );

        foreach ( Coordinate obj in floorPlan.coordinate ) {
            GameObject objToSpawn = GetObjectFromName ( obj.objectType );
            if ( objToSpawn != null ) {
                 
                switch ( obj.posX ) {
                    case 0:
                        translatedX = obj.posX;
                        break;
                    case 1:
                        translatedX = obj.posX + horizontalShift;
                        break;
                    case 2:
                        translatedX = obj.posX + 2 * horizontalShift;
                        break;
                    case 3:
                        translatedX = obj.posX + 3 * horizontalShift;
                        break;
                    case 4:
                        translatedX = obj.posX + 4 * horizontalShift;
                        break;
                    default:
                        translatedX = obj.posX;
                        break;
                }

                switch ( obj.posY ) {
                    case 0:
                        translatedY = obj.posY;
                        break;
                    case 1:
                        translatedY = obj.posY + verticalShift;
                        break;
                    case 2:
                        translatedY = obj.posY + 2 * verticalShift;
                        rotation = new Vector3 ( 0, 180, 0 );
                        break;
                    case 3:
                        translatedY = obj.posY + 3 * verticalShift;
                        break;
                    case 4:
                        translatedY = obj.posY + 4 * verticalShift;
                        break;
                    default:
                        translatedY = obj.posY;
                        break;
                }

                if ( objToSpawn.name == "Grill" ) {
                    SpawnStandardObject ( rangehood, new Vector3 ( translatedY, 2.085f, translatedX ) + offset, rotation );
                }

                if ( objToSpawn.name == "Sink" ) {
                    rotation = new Vector3 ( 0, 0, 0 );
                }

                if ( !plateSpawned ) {
                    if ( objToSpawn.name == "table" ) {
                        plateSpawned = true;
                        SpawnStandardObject ( plate, new Vector3 ( translatedY, 0.8725004f, translatedX ) + offset, rotation );
                        SpawnStandardObject ( plate, new Vector3 ( translatedY, 1f, translatedX ) + offset, rotation );
                        SpawnStandardObject ( plate, new Vector3 ( translatedY, 1.2f, translatedX ) + offset, rotation );
                        SpawnStandardObject ( plate, new Vector3 ( translatedY, 1.4f, translatedX ) + offset, rotation );
                    }
                }

                SpawnStandardObject ( objToSpawn, new Vector3 ( translatedY, 0, translatedX ) + offset, rotation );
            }
        }
    }

    private GameObject GetObjectFromName (string name) {
        switch ( name ) {
            case "Grill":
                return grill;
            case "Table":
                return table;
            case "Fridge":
                return fridge;
            case "Sink":
                return sink;
            case "Microwave":
                return microwave;
            default:
                return null;
        }
    }
}
